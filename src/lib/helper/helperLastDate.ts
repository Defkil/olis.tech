/**
 * Get the last publish or update date from a list of posts
 * @param posts List of posts
 */
export function helperLastPublishOrUpdate(
  posts: Partial<{ publishDate: Date; updateDate?: Date | undefined }>[],
): Date {
  let lastDate = new Date(0);
  for (const post of posts) {
    if (post.publishDate && post.publishDate > lastDate) {
      lastDate = post.publishDate;
    }
    if (post.updateDate && post.updateDate > lastDate) {
      lastDate = post.updateDate;
    }
  }
  return lastDate;
}
