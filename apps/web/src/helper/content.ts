import type { PostSchema } from './category.ts';
import { getCollection } from 'astro:content';

export async function contentGetCategoryPosts(
  categoryCollection: string,
  length = -1,
): Promise<{
  posts: PostSchema[];
  total: number;
}> {
  if (length === 0) {
    return {
      posts: [],
      total: 0,
    };
  }

  const data = (await getCollection(categoryCollection as any)).sort(
    (a: any, b: any) => {
      if (a.data.publishDate > b.data.publishDate) {
        return -1;
      }
      if (a.data.publishDate < b.data.publishDate) {
        return 1;
      }
      return 0;
    },
  );

  let result = data;
  if (length > 0) {
    result = data.slice(0, length);
  }

  return {
    posts: result.map((post: any) => {
      return {
        title: post.data.title,
        description: post.data.description,
        image: post.data.image,
        imageAlt: post.data.imageAlt,
        publishDate: post.data.publishDate,
        updateDate: post.data.updateDate,
        slug: post.slug,
      };
    }),
    total: data.length,
  };
}
