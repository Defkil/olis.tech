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

// window types

interface Window {
  swup: import("swup").default;
}

// external modules

declare module "macy" {
  /**
   * masonry layout library
   * https://github.com/bigbite/macy.js
   * @param options
   */
  export default function macy(options: any): {
    /**
     * when called this recalculates the entire layout
     * @param refresh  if true, will recalculate all items
     */
    recalculate: (refresh?: boolean) => void;
    /**
     * used to do something each time and image loads or after all images have been loaded
     * @param cb  Function to run on image load
     * @param onEveryImage If true it will run everytime an image loads
     */
    runOnImageLoad: (cb: () => void, onEveryImage?: boolean) => void;
  };
}
declare module "@swup/head-plugin";
declare module "@swup/slide-theme";
declare module "@swup/preload-plugin";
