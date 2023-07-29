import { getCollection } from "astro:content";
import type { PostSchema } from "../../content/_categories";

/**
 * Get posts from a category
 * @param categoryCollection Category collection name
 * @param length Number of posts to return. If length is 0, return empty array
 */
export async function contentGetCategoryPosts(
  categoryCollection: string,
  length: number = -1,
): Promise<{
  posts: PostSchema[];
  total: number;
}> {
  if (length == 0) {
    return {
      posts: [],
      total: 0,
    };
  }

  const data = (await getCollection(categoryCollection as any)).sort((a, b) => {
    if (a.data.publishDate > b.data.publishDate) {
      return -1;
    }
    if (a.data.publishDate < b.data.publishDate) {
      return 1;
    }
    return 0;
  });

  let result = data;
  if (length > 0) {
    result = data.slice(0, length);
  }

  return {
    posts: result.map((post) => {
      return {
        title: post.data.title,
        description: post.data.description,
        image: post.data.image,
        publishDate: post.data.publishDate,
        updateDate: post.data.updateDate,
        slug: post.slug,
      };
    }),
    total: data.length,
  };
}
