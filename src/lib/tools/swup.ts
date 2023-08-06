const SWUP_CONTAINER_ID = "swup";
/**
 * Setup swup with plugins and assign it to window.swup
 * called from layout
 */
export function setupSwup(): void {
  document.addEventListener("swup:visit:end", () => {
    document.getElementById(SWUP_CONTAINER_ID)?.scrollIntoView();
  });
}

/**
 * Preload visible links
 */
export function preloadPages() {
  const swup = (window as unknown as { swup: { preloadPages: () => {} } }).swup;
  if (swup) {
    swup.preloadPages();
  }
}
