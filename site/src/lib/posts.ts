import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { MarkdownHeading } from 'astro';
import { slugify } from '../../plugins/slugify.mjs';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  tags: string[];
  minutes: number;
  Content: AstroComponentFactory;
  headings: MarkdownHeading[];
  entry: CollectionEntry<'blog'>;
}

/**
 * Loads every blog post, renders it, and merges explicit frontmatter with
 * the values inferred by remark-meta (title from H1/filename, date from git,
 * auto description, reading time). Sorted newest first.
 */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);

  const posts = await Promise.all(
    entries.map(async (entry) => {
      const { Content, headings, remarkPluginFrontmatter: rfm } = await render(entry);
      const date = entry.data.date ?? (rfm.date ? new Date(rfm.date) : new Date());
      return {
        slug: entry.id.split('/').map(slugify).join('/'),
        title: entry.data.title ?? rfm.title ?? entry.id,
        description: entry.data.description ?? rfm.description ?? '',
        date,
        updated: entry.data.updated,
        tags: entry.data.tags,
        minutes: rfm.minutes ?? 1,
        Content,
        headings,
        entry,
      } satisfies Post;
    })
  );

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
