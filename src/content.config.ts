import { type CollectionEntry, defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import type { CategoryData } from './env';

function createBlogCategory(path: string) {
  return defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/" + path }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
    }),
  });
}

const blog = createBlogCategory('blog');
const webdev = createBlogCategory('webdev');
const nodejs = createBlogCategory('nodejs');

export const collections = { blog, webdev, nodejs };
export type CollectionKeys = keyof typeof collections;

export type BlogCollectionKey = keyof typeof collections;
export type BlogPost = CollectionEntry<BlogCollectionKey>;


export const categories: CategoryData[] = [
  {
    title: "Meine Projekte",
    collection: "blog",
  },
  {
    title: "Webentwicklung",
    collection: "webdev",
  },
  {
    title: "NodeJS",
    collection: "nodejs",
  },
];
