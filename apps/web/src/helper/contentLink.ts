export function contentLinkCategory(categoryCollection: string): string {
  return `/${categoryCollection}/`;
}

export function contentLinkPost(categoryCollection: string, slug: string): string {
  return `/${categoryCollection}/${slug}/`;
}
