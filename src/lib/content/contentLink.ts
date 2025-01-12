export function contentLinkCategory(categoryCollection: string): string {
  return `/${categoryCollection}/`;
}

export function contentLinkPost(categoryCollection: string, id: string): string {
  return `/${categoryCollection}/${id}/`;
}
