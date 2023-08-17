/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import { z } from "astro:content";
import { postSchemaDefault } from "./content/config";

// app types

/** Category data */
export interface CategoryData<T extends PostSchema = PostSchema> {
  title: string;
  collection: string;
  description: string;
  /** Custom category data */
  custom?: {
    layout: string;
    schema: T;
  };
}

/** Post schema with slug */
export const postSchema = postSchemaDefault.extend({
  slug: z.string(),
});

/** Post schema type */
export type PostSchema = z.infer<typeof postSchema>;

/** Single Post window props */
export interface PostWindowProps {
  category: string;
  categoryLink: string;
  lastPublishOrUpdate: string;
  image: string;
  imageAlt: string;
  titel: string;
  excerpt: string;
  link: string;
}

declare global {
  interface Window {
    swup: {
      preloadPages: () => void;
      hooks: {
        on: (event: string, callback: (data: any) => void) => void;
      };
    };
  }
}
