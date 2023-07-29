import type { CategoryData } from "../../env";
import { categories } from "../../const/categories";

/**
 * Cached category data
 * for a faster build time
 */
class CachedCategoryData {
  private cache: Record<string, CategoryData> = {};
  public get(categoryName: string): CategoryData {
    if (!this.cache[categoryName]) {
      this.cache[categoryName] = findCategoryData(categoryName);
    }
    return this.cache[categoryName]!;
  }
}

/**
 * Find category data
 * @param categoryName Category name
 */
export const findCategoryData = (categoryName: string): CategoryData => {
  const category = categories.find((category) => category.collection === categoryName);
  if (!category) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return category;
};

const cachedCategoryData = new CachedCategoryData();

/**
 * Get category data
 * @param collection Category collection (folder name)
 */
export const getCategoryData = (collection: string): CategoryData => cachedCategoryData.get(collection);
