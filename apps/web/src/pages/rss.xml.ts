import rss, { type RSSFeedItem } from '@astrojs/rss';
import { SITE_CATEGORIES, SITE_DESCRIPTION, SITE_TITLE } from '../consts.ts';
import { contentGetCategoryPosts } from '../helper/content.ts';

export async function GET(context: any) {
  const posts: RSSFeedItem[] = [];

  for (const category of SITE_CATEGORIES) {
    const { posts: categoryPosts } = await contentGetCategoryPosts(
      category.collection,
      10,
    );
    for (const post of categoryPosts) {
      posts.push({
        title: post.title,
        description: post.description,
        link: `https://olis.tech/${category.collection}/${post.slug}`,
        categories: [category.title],
        pubDate: post.publishDate,
      });
    }
  }

  posts.sort((a, b) => {
    if (!b.pubDate) return -1;
    if (!a.pubDate) return 1;
    return b.pubDate.getTime() - a.pubDate.getTime();
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.slice(0, 10),
  });
}
