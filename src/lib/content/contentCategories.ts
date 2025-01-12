import type { CategoryData } from '../../env';
import { categories } from '../../content.config.ts';

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
  const category = categories.find((category) => category.collection === categoryName); //todo fix categories
  if (!category) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return category;
};

const cachedCategoryData = new CachedCategoryData();

export const getCategoryData = (collection: string): CategoryData => cachedCategoryData.get(collection);
