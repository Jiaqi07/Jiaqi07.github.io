import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts: drop any .md file (straight from Obsidian) into src/content/blog/.
 * Every field is optional — title/date/description are inferred when missing.
 * Files starting with "_" are ignored (use for templates/drafts-in-progress).
 */
const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
