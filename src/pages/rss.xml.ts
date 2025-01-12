import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { type BlogCollectionKey, collections } from '../content.config.ts';

export async function GET(context: { site: string }) {
  const allPosts = await Promise.all(
    Object.keys(collections).map(async (collection) => {
      const posts = await getCollection(collection as BlogCollectionKey);
      return posts.map((post) => ({
        ...post,
        collection,
      }));
    })
  );

  const posts = allPosts
    .flat()
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const createUrl = (path: string) => {
    return path.startsWith("/") ? path : `/${path}`;
  };

  const categoryLinksXML = Object.keys(collections)
    .map((category) => {
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      return `
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="${SITE_TITLE} - ${capitalizedCategory} Feed"
          href="${createUrl(`${category}/rss.xml`)}"
        />`;
    })
    .join("");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: createUrl(`${post.collection}/${post.id}/`),
      pubDate: post.data.pubDate,
      description: post.data.description,
      categories: [post.collection],
    })),
    stylesheet: "/feed.xsl",
    customData: `
      ${categoryLinksXML}
    `,
  });
}
