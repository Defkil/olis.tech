import { type CollectionEntry, defineCollection, z } from "astro:content";

function createBlogCategory() {
  return defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
    }),
  });
}

const general = createBlogCategory();
const webdev = createBlogCategory();
const nodejs = createBlogCategory();

export const collections = { general, webdev, nodejs };
export const blogCollections = { general, webdev, nodejs };

export type BlogCollectionKey = keyof typeof blogCollections;
export type BlogPost = CollectionEntry<BlogCollectionKey>;
