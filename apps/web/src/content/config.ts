import { defineCollection, z } from 'astro:content';
import { SITE_CATEGORIES } from '../consts.ts';


/** Post schema for astro */
export const postSchemaDefault = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string().array().optional(),
  image: z.string().url(),
  imageAlt: z.string(),
  publishDate: z.date(),
  updateDate: z.date().optional(),
});

export const collections: {
  [key: string]: any;
} = {};

for (const category of SITE_CATEGORIES) {
  collections[category.collection] = defineCollection({
    type: "content",
    schema: postSchemaDefault,
  });
}
