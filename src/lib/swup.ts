import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupSlideTheme from "@swup/slide-theme";
import SwupPreloadPlugin from "@swup/preload-plugin";

const SWUP_CONTAINER_ID = "swup";
const SWUP_PLUGINS = [new SwupPreloadPlugin(), new SwupHeadPlugin(), new SwupSlideTheme({ reversed: false })];

/**
 * Setup swup with plugins and assign it to window.swup
 * called from layout
 */
export function setupSwup(): Swup {
  const swup = new Swup({
    plugins: SWUP_PLUGINS,
  });
  window.swup = swup;
  swup.on("contentReplaced", scrollToSwupContent);
  return swup;
}

/** Scroll to the top of the swup container */
function scrollToSwupContent(): void {
  document.getElementById(SWUP_CONTAINER_ID)?.scrollIntoView({ behavior: "smooth" });
}
