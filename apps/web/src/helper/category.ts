import { postSchemaDefault } from '../content/config.ts';
import { z } from 'astro/zod';
import { SITE_CATEGORIES } from '../consts.ts';

export interface CategoryData<T extends PostSchema = PostSchema> {
  title: string;
  collection: string;
  description: string;
  custom?: {
    layout: string;
    schema: T;
  };
}
export const postSchema = postSchemaDefault.extend({
  slug: z.string(),
});
export type PostSchema = z.infer<typeof postSchema>;

class CachedCategoryData {
  private cache: Record<string, CategoryData> = {};
  public get(categoryName: string): CategoryData {
    if (!this.cache[categoryName]) {
      this.cache[categoryName] = findCategoryData(categoryName);
    }
    return this.cache[categoryName]!;
  }
}

export const findCategoryData = (categoryName: string): CategoryData => {
  const category = SITE_CATEGORIES.find((category) => category.collection === categoryName);
  if (!category) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return category;
};

const cachedCategoryData = new CachedCategoryData();
export const getCategoryData = (collection: string): CategoryData => cachedCategoryData.get(collection);
