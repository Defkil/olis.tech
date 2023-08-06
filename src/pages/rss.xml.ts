import rss, { type RSSFeedItem, rssSchema } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { categories } from "../const/categories";
import probe from "probe-image-size";
import type { z } from "astro/zod";
import { SITE_AUTHOR_MAIL, SITE_DESCRIPTION, SITE_TITLE } from "../const/data";
import type { CategoryData } from "../env";

type RSSFeedEnclosure = z.infer<typeof rssSchema>["enclosure"];

/**
 * Get image metadata
 * // todo: works only with http urls, need to add code for local files see https://github.com/nodeca/probe-image-size
 * // todo: dont work with cat images on length
 * @param url image url
 */
async function getImageMetaData(url: string): Promise<RSSFeedEnclosure> {
  const imgData = await probe(url);
  return { url, length: 1, type: imgData.mime };
}

/**
 * Transform post to feed item
 * @param post post data from collection
 * @param category category data
 * @param site root url
 */
async function transformPostToFeedItem(post: any, category: CategoryData, site: string): Promise<RSSFeedItem> {
  return {
    link: site + "/" + category.collection + "/" + post.slug,
    content: post.body,
    title: post.data.title,
    pubDate: post.data.publishDate,
    description: post.data.description,
    categories: [category.title],
    author: SITE_AUTHOR_MAIL,
    enclosure: post.data.image ? await getImageMetaData(post.data.image) : undefined,
  };
}

/**
 * Get rss feed
 * // todo: pagination or limit
 * @param context astro context
 */
export async function get(context: any) {
  const posts: RSSFeedItem[] = [];

  for (const category of categories) {
    const collection = await getCollection(category.collection as any);
    for (const post of collection) {
      posts.push(await transformPostToFeedItem(post, category, context.site));
    }
  }

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts,
    customData: `<language>de-de</language>`,
    stylesheet: "/pretty-feed-v3.xsl",
  });
}
