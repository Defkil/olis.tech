const SWUP_CONTAINER = "main";
/**
 * disable scroll reset on page change
 * scroll to content on page change
 */
export function setupSwup(): void {
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.swup.hooks.on("visit:start", (visit: { scroll: { reset: boolean } }) => {
        visit.scroll.reset = false;
      });

      window.swup.hooks.on("visit:end", () => {
        document.querySelector(SWUP_CONTAINER)?.scrollIntoView();
      });
    }, 1000);
  });
}

/**
 * Preload visible links
 */
export function preloadPages() {
  const swup = (window as unknown as { swup: { preloadPages: () => {} } }).swup;
  if (swup) {
    window.swup.preloadPages();
  }
}
