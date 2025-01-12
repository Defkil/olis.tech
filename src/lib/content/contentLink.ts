/**
 * Link to a category collection
 * @param categoryCollection Category collection name
 */
export function contentLinkCategory(categoryCollection: string): string {
  return `/${categoryCollection}/`;
}

/**
 * Link to a post
 * @param categoryCollection Category collection name
 * @param slug Post slug
 */
export function contentLinkPost(categoryCollection: string, slug: string): string {
  return `/${categoryCollection}/${slug}/`;
}
