import { z, defineCollection } from "astro:content";
import { categories } from "./_categories";
import type { CollectionConfig } from "astro/dist/content/utils";

const collectionSchemaDefault = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  publishDate: z.date(),
  updateDate: z.date().optional(),
});

export const collections: {
  [key: string]: CollectionConfig;
} = {};

for (const category of categories) {
  collections[category.collection] = defineCollection({
    type: "content",
    schema: collectionSchemaDefault,
  });
}
