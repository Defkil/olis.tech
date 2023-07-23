export function onPageView(callback: () => void) {
  document.addEventListener("DOMContentLoaded", () => {
    (window as any).swup.on("pageView", callback);
  });
}
