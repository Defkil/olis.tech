/// <reference path="../.astro/types.d.ts" />
// todo remove types here
/** @deprecated */
export interface CategoryData<T extends PostSchema = PostSchema> {
  title: string;
  collection: string;
  /** Custom category data */
  custom?: {
    layout: string;
    schema: T;
  };
}

/** @deprecated */
export interface PostWindowProps {
  category: string;
  categoryLink: string;
  lastPublishOrUpdate: string;
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  link: string;
}

/** @deprecated */
export const postSchema = postSchemaDefault.extend({
  slug: z.string(),
});

/** @deprecated */
export type PostSchema = z.infer<typeof postSchema>;
