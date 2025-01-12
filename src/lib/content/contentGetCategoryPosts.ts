import { type CollectionEntry, getCollection } from 'astro:content';
import type { CollectionKeys } from '../../content.config.ts';

export async function contentGetCategoryPosts(
  categoryCollection: string,
  length = -1,
): Promise<{
  posts: CollectionEntry<CollectionKeys>[];
  total: number;
}> {
  if (length === 0) {
    return {
      posts: [],
      total: 0,
    };
  }

  const data = (await getCollection(categoryCollection as any)).sort((a: any, b: any) => {
    if (a.data.publishDate > b.data.publishDate) {
      return -1;
    }
    if (a.data.publishDate < b.data.publishDate) {
      return 1;
    }
    return 0;
  }) as CollectionEntry<CollectionKeys>[];

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
        data: post.data,
        collection: post.collection,
        pubDate: post.data.pubDate,
        updatedDate: post.data.updatedDate,
        id: post.id,
      };
    }),
    total: data.length,
  };
}
