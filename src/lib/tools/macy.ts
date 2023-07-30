import Macy from "macy";

const CONTAINER_SELECTOR = ".masonry";

export function setupMacy() {
  createMacy();
}

export function createMacy() {
  return Macy({
    container: CONTAINER_SELECTOR,
    trueOrder: true,
    waitForImages: false,
    margin: 24,
    columns: 1,
    mobileFirst: true,
    breakAt: {
      1200: 3,
      800: 2,
    },
  }).recalculate(true);
}

export function renewMacyOnPageChange() {
  document.addEventListener("swup:contentReplaced", () => {
    if (document.querySelector(CONTAINER_SELECTOR) === null) {
      return;
    }
    createMacy().recalculate(true);
  });
}
