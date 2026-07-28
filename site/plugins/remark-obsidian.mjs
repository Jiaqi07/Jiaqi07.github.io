import { visit } from 'unist-util-visit';
import { slugify } from './slugify.mjs';

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const CALLOUT_RE = /^\[!(\w+)\]([+-]?)\s*(.*)$/;

/**
 * Obsidian-flavored markdown support:
 *  - ![[image.png]]            -> embedded image (relative to the note)
 *  - [[Note Name]]             -> link to /blog/note-name
 *  - [[Note Name|label]]       -> link with custom label
 *  - ==highlight==             -> <mark>
 *  - %%comment%%               -> stripped
 *  - > [!note] Title           -> styled callout blockquote (note/tip/info/warning/danger/quote/example)
 */
export function remarkObsidian() {
  return (tree) => {
    // --- inline syntax on text nodes ---
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null) return;
      const value = node.value;
      if (!/(\[\[|==|%%)/.test(value)) return;

      const parts = [];
      let cursor = 0;
      const pattern = /!\[\[([^\]]+)\]\]|\[\[([^\]]+)\]\]|==([^=]+)==|%%[\s\S]*?%%/g;
      let m;
      while ((m = pattern.exec(value)) !== null) {
        if (m.index > cursor) parts.push({ type: 'text', value: value.slice(cursor, m.index) });
        if (m[1] !== undefined) {
          // ![[embed]]
          const target = m[1].split('|')[0].trim();
          if (IMAGE_EXT.test(target)) {
            const url = target.includes('/') ? target : `./${target}`;
            parts.push({ type: 'image', url, alt: target.replace(/\.[^.]+$/, ''), title: null });
          } else {
            parts.push({
              type: 'link',
              url: `/blog/${slugify(target.split('/').pop())}`,
              children: [{ type: 'text', value: target }],
            });
          }
        } else if (m[2] !== undefined) {
          // [[wikilink]] or [[wikilink|label]]
          const [target, label] = m[2].split('|').map((s) => s.trim());
          parts.push({
            type: 'link',
            url: `/blog/${slugify(target.split('/').pop())}`,
            children: [{ type: 'text', value: label || target }],
          });
        } else if (m[3] !== undefined) {
          // ==highlight==
          parts.push({ type: 'html', value: '<mark>' });
          parts.push({ type: 'text', value: m[3] });
          parts.push({ type: 'html', value: '</mark>' });
        }
        // %%comments%% are dropped
        cursor = m.index + m[0].length;
      }
      if (parts.length === 0) return;
      if (cursor < value.length) parts.push({ type: 'text', value: value.slice(cursor) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });

    // --- callouts: > [!type] Title ---
    visit(tree, 'blockquote', (node) => {
      const first = node.children?.[0];
      if (!first || first.type !== 'paragraph') return;
      const firstText = first.children?.[0];
      if (!firstText || firstText.type !== 'text') return;

      const lines = firstText.value.split('\n');
      const match = lines[0].match(CALLOUT_RE);
      if (!match) return;

      const type = match[1].toLowerCase();
      const title = match[3].trim();

      // strip the "[!type] Title" line from the paragraph
      const rest = lines.slice(1).join('\n');
      if (rest) firstText.value = rest;
      else {
        first.children.shift();
        // drop a leading break node if present
        if (first.children[0]?.type === 'break') first.children.shift();
        if (first.children.length === 0) node.children.shift();
      }

      node.data = node.data || {};
      node.data.hProperties = {
        ...(node.data.hProperties || {}),
        className: ['callout', `callout-${type}`],
        'data-callout': type,
      };

      const label = title || type.charAt(0).toUpperCase() + type.slice(1);
      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['callout-title'] } },
        children: [{ type: 'text', value: label }],
      });
    });
  };
}
