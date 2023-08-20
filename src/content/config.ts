import { defineCollection, z } from "astro:content";
import type { CollectionConfig } from "astro/dist/content/utils";
import { categories } from "../const/categories";

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

/**
 * Astro collections
 * https://docs.astro.build/de/guides/content-collections/
 */
export const collections: {
  [key: string]: CollectionConfig;
} = {};

for (const category of categories) {
  collections[category.collection] = defineCollection({
    type: "content",
    schema: postSchemaDefault,
  });
}
