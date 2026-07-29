import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Everything on /blog lives here: drop any .md file (straight from Obsidian)
 * into src/content/blog/. Every field is optional — title/date/description are
 * inferred when missing. Files starting with "_" are ignored (templates/drafts).
 *
 * `kind` splits the page in two:
 *   essay — finished writing, listed newest first
 *   note  — the living reference pile, grouped by `area` and ordered by `order`
 */
const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    kind: z.enum(['essay', 'note']).default('essay'),
    area: z.enum(['foundations', 'models', 'research']).optional(),
    order: z.number().default(100),
    wip: z.boolean().default(false), // shows an "in progress" marker; still published
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
