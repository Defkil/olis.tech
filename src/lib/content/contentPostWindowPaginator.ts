import type { PostWindowProps } from "../../env";
import { helperShowDate } from "../helper/helperShowDate";
import { contentLinkCategory, contentLinkPost } from "./contentLink";
import { getCategoryData } from "./contentCategories";
import { contentGetCategoryPosts } from "./contentGetCategoryPosts";

const PAGE_SIZE = 10;

/** for date sorting */
interface DateSort {
  date: Date;
}

/** posts with date sort */
type PostWindowPropsWithDateSort = PostWindowProps & DateSort;

/** sort by date */
function sortDate(a: DateSort, b: DateSort) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}

/** Get all posts from all categories and sort by date */
async function getAllPostsAndSorts(): Promise<PostWindowProps[]> {
  const allPosts = import.meta.glob("../../content/**/*.md");
  const result: PostWindowPropsWithDateSort[] = [];
  for (const path in allPosts) {
    const post = (await allPosts[path]!()) as any;
    const folderAsCollection = path.split("/").slice(-2, -1)[0]!;
    const categoryData = getCategoryData(folderAsCollection);
    const postDate = new Date(post.frontmatter.publishDate);
    result.push({
      category: categoryData.title,
      categoryLink: contentLinkCategory(categoryData.collection),
      date: postDate,
      lastPublishOrUpdate: helperShowDate(postDate),
      image: post.frontmatter.image,
      imageAlt: post.frontmatter.imageAlt,
      titel: post.frontmatter.title,
      excerpt: post.frontmatter.description,
      link: contentLinkPost(categoryData.collection, post.frontmatter.slug),
    });
  }
  return result.sort(sortDate);
}

/** Get all posts from a category and sort by date */
async function getCollectionPostsAndSorts(collection: string): Promise<PostWindowProps[]> {
  const collectionPosts = await contentGetCategoryPosts(collection);
  const categoryData = getCategoryData(collection);
  const result: PostWindowPropsWithDateSort[] = [];

  for (const post of collectionPosts.posts) {
    const postDate = new Date(post.publishDate);
    result.push({
      category: categoryData.title,
      categoryLink: contentLinkCategory(categoryData.collection),
      date: postDate,
      lastPublishOrUpdate: helperShowDate(postDate),
      image: post.image,
      imageAlt: post.imageAlt,
      titel: post.title,
      excerpt: post.description,
      link: contentLinkPost(categoryData.collection, post.slug),
    });
  }

  return result.sort(sortDate);
}

/**
 * Get posts from a page
 * @param posts All posts
 * @param page Selected page number
 */
async function paginatorGetPage(posts: PostWindowProps[], page: number): Promise<PostWindowProps[]> {
  return posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

/**
 * Get posts from a category
 * @param page Page number
 * @param collection Category collection, if not provided, return all posts
 */
export async function contentPostWindowPaginator(page: number, collection?: string): Promise<PostWindowProps[]> {
  let posts: PostWindowProps[] = [];
  if (!collection) {
    posts = await getAllPostsAndSorts();
  } else {
    posts = await getCollectionPostsAndSorts(collection);
  }
  return paginatorGetPage(posts, page);
}
