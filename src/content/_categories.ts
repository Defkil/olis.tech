import { z } from "astro:content";
import { categories } from "../const/categories";

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  publishDate: z.date(),
  updateDate: z.date().optional(),
  slug: z.string(),
});

export type PostSchema = z.infer<typeof postSchema>;

export interface CategoryData<T extends PostSchema = PostSchema> {
  title: string;
  collection: string;
  description: string;
  image: string;
  custom?: {
    layout: string;
    schema: T;
  };
}

export const getCategoryData = (categoryName: string): CategoryData => {
  const category = categories.find((category) => category.collection === categoryName);
  if (!category) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return category;
};
