import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { MarkdownHeading } from 'astro';
import { slugify } from '../../plugins/slugify.mjs';

export type Kind = 'essay' | 'note';
export type Area = 'foundations' | 'models' | 'research';

/** Section order and copy for the notes half of /blog. */
export const AREAS: { key: Area; label: string; blurb: string }[] = [
  {
    key: 'foundations',
    label: 'Foundations',
    blurb: 'The math I forget.',
  },
  {
    key: 'models',
    label: 'Models & training',
    blurb: 'What each family of model is actually optimizing, and how the pieces get put together.',
  },
  {
    key: 'research',
    label: 'Papers & research notes',
    blurb: 'Reading-group writeups.',
  },
];

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  kind: Kind;
  area?: Area;
  order: number;
  wip: boolean;
  tags: string[];
  minutes: number;
  Content: AstroComponentFactory;
  headings: MarkdownHeading[];
  entry: CollectionEntry<'blog'>;
}

/**
 * Loads every post, renders it, and merges explicit frontmatter with
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
        kind: entry.data.kind,
        area: entry.data.area,
        order: entry.data.order,
        wip: entry.data.wip,
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

/** Finished writing, newest first. */
export const essays = (posts: Post[]) => posts.filter((p) => p.kind === 'essay');

/** The reference pile, in reading order rather than date order. */
export const notes = (posts: Post[]) =>
  posts
    .filter((p) => p.kind === 'note')
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

/** Groups notes into the AREAS order, dropping sections that are empty. */
export function groupByArea(posts: Post[]) {
  const all = notes(posts);
  return AREAS.map((area) => ({
    ...area,
    posts: all.filter((p) => p.area === area.key),
  })).filter((g) => g.posts.length > 0);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function formatMonth(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
}
