import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../../consts";
import { type BlogCollectionKey, blogCollections } from "../../content/config";

export async function getStaticPaths() {
  return Object.keys(blogCollections).map((category) => ({
    params: { category },
  }));
}

export async function GET(context: {
  params: { category: string };
  site: string;
}) {
  const { category } = context.params;

  if (!(category in blogCollections)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const posts = await getCollection(category as BlogCollectionKey);
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return rss({
    title: `${SITE_TITLE} - ${capitalizedCategory}`,
    description: `${SITE_DESCRIPTION} - All posts about ${capitalizedCategory}`,
    site: context.site,
    items: sortedPosts.map((post) => ({
      ...post.data,
      link: `/${category}/${post.slug}/`,
      pubDate: post.data.pubDate,
      description: post.data.description,
      categories: [category],
    })),
    stylesheet: "/feed.xsl",
    customData: `<category>${capitalizedCategory}</category>`,
  });
}
