import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  essays: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
    schema: z.object({ title: z.string(), date: z.coerce.date(), summary: z.string().optional(), category: z.string().default('other'), draft: z.boolean().default(false) }),
  }),
  experience: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
    schema: z.object({ role: z.string(), org: z.string(), period: z.string(), order: z.number().default(0) }),
  }),
};
