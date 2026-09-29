// @ts-check
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('01-Reflections'),
    status: z.enum(['seedling', 'growing', 'evergreen', 'retrospective']).default('seedling'),
    draft: z.boolean().default(false),
    author: z.string().default('Tech Thinker'),
  }),
});

export const collections = { posts };
