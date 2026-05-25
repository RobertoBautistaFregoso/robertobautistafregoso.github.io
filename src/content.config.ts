import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects content collection (ADR-0002). Add a project = drop a markdown file
// in src/content/projects/. `repoLink` is reserved for V2 (ADR-0001).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    year: z.number().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
    repoLink: z.string().url().optional(), // V2 — do not render yet
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { projects };
