import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';

const gitDateCache = new Map();

function firstCommitDate(filePath) {
  if (gitDateCache.has(filePath)) return gitDateCache.get(filePath);
  let date = null;
  try {
    const out = execSync(
      `git log --follow --diff-filter=A --format=%aI -- "${path.basename(filePath)}"`,
      { cwd: path.dirname(filePath), stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000 }
    )
      .toString()
      .trim();
    const lines = out.split('\n').filter(Boolean);
    if (lines.length) date = lines[lines.length - 1];
  } catch {
    /* not committed yet, or git unavailable */
  }
  if (!date) {
    try {
      const st = fs.statSync(filePath);
      date = (st.birthtime?.getTime() ? st.birthtime : st.mtime).toISOString();
    } catch {
      date = new Date().toISOString();
    }
  }
  gitDateCache.set(filePath, date);
  return date;
}

function textOf(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children || []).map(textOf).join('');
}

/**
 * Makes bare Obsidian notes work with zero frontmatter:
 *  - title:       frontmatter > first "# H1" (which is then removed) > filename
 *  - description: frontmatter > first paragraph (trimmed to ~200 chars)
 *  - date:        frontmatter > first git commit of the file > file creation time
 *  - minutes:     computed reading time
 */
export function remarkMeta() {
  return (tree, file) => {
    file.data.astro = file.data.astro || {};
    const fm = (file.data.astro.frontmatter = file.data.astro.frontmatter || {});
    const filePath = file.history?.[0] || file.path || '';

    // title
    if (!fm.title) {
      const first = tree.children.find((n) => n.type !== 'yaml');
      if (first && first.type === 'heading' && first.depth === 1) {
        fm.title = textOf(first).trim();
        tree.children.splice(tree.children.indexOf(first), 1);
      } else if (filePath) {
        fm.title = path
          .basename(filePath)
          .replace(/\.[^.]+$/, '')
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
      }
    }

    // description
    if (!fm.description) {
      const para = tree.children.find((n) => n.type === 'paragraph');
      if (para) {
        let text = textOf(para).replace(/\s+/g, ' ').trim();
        if (text.length > 200) text = text.slice(0, 197).trimEnd() + '…';
        fm.description = text;
      }
    }

    // date
    if (!fm.date && filePath) fm.date = firstCommitDate(filePath);

    // reading time
    let words = 0;
    visit(tree, ['text', 'inlineCode', 'code'], (n) => {
      words += String(n.value).split(/\s+/).filter(Boolean).length;
    });
    fm.minutes = Math.max(1, Math.round(words / 220));
    fm.words = words;
  };
}
