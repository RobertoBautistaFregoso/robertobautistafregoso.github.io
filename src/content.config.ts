import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["professional", "experiment"]),
    description: z.string(),
    skills: z.array(z.string()),
    thumbnail: z.string(),
    thumbnailDark: z.string().optional(),
    thumbnailWide: z.string().optional(),
    thumbnailWideDark: z.string().optional(),
    heroImage: z.string().optional(),
    sortOrder: z.number(),
    draft: z.boolean().default(false),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    preview: z.string(),
    experience: z.enum(["app", "demo"]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, lab };
