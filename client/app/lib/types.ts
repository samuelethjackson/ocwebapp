import { z } from "zod";

// Sanity Content Types
export const PortableTextBlockSchema = z.object({
  _key: z.string(),
  _type: z.string(),
  children: z.array(z.any()),
  markDefs: z.array(z.any()),
});

export const FootnoteSchema = z.object({
  _key: z.string(),
  _type: z.literal("footnote"),
  number: z.number(),
  text: z.string(),
});

export const BlogOverviewSchema = z.object({
  title: z.string(),
  currentSlug: z.string(),
  author: z.string(),
  category: z.string(),
  type: z.string(),
});

export const FullBlogSchema = z.object({
  title: z.string(),
  currentSlug: z.string(),
  author: z.string(),
  biographyText: z.string(),
  biographyName: z.string(),
  date: z.string(),
  language: z.string(),
  citation: z.string(),
  category: z.string(),
  content: z.array(PortableTextBlockSchema),
});

// TypeScript Types
export type PortableTextBlock = z.infer<typeof PortableTextBlockSchema>;
export type Footnote = z.infer<typeof FootnoteSchema>;
export type BlogOverview = z.infer<typeof BlogOverviewSchema>;
export type FullBlog = z.infer<typeof FullBlogSchema>; 