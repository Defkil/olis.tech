import { contentLinkCategory, contentLinkPost } from "../content/contentLink.ts";
import { helperShowDate } from "./helperShowDate.ts";
import type { PostWindowProps } from "../../env";
import { findCategoryData } from "../content/contentCategories.ts";

/**
 * Transform astro entry to PostWindowProps
 * @param entry
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformEntryToPostWindow(entry: any): PostWindowProps {
  return {
    category: findCategoryData(entry.collection).title,
    categoryLink: contentLinkCategory(entry.collection),
    lastPublishOrUpdate: helperShowDate(entry.data.publishDate),
    image: entry.data.image,
    imageAlt: entry.data.imageAlt,
    title: entry.data.title,
    excerpt: entry.data.description,
    link: contentLinkPost(entry.collection, entry.slug),
  };
}
