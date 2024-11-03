import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { type BlogCollectionKey, blogCollections } from "../content/config";

export async function GET(context: { site: string }) {
  const allPosts = await Promise.all(
    Object.keys(blogCollections).map(async (collection) => {
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

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.collection}/${post.slug}/`,
      pubDate: post.data.pubDate,
      description: post.data.description,
      categories: [post.collection],
    })),
    stylesheet: "/feed.xsl",
  });
}
