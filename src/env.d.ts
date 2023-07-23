/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

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

interface Window {
  swup: import("swup").default;
}
