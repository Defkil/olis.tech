import type { HeaderCategoriesDomHandler } from "./HeaderCategoriesDom";
import {
  HeaderCategoriesDomLinkHref,
  HeaderCategoriesDomPosts,
  HeaderCategoriesDomString,
} from "./HeaderCategoriesDom";
import { preloadPages } from "../../../lib/tools/swup";

export interface HeaderCategoriesData {
  title: string;
  link: string;
  description: string;
  posts: { title: string; link: string }[];
}

export class HeaderCategories extends HTMLElement {
  domChanger: HeaderCategoriesDomHandler[] = [
    new HeaderCategoriesDomString(".js--title", "title"),
    new HeaderCategoriesDomLinkHref(".js--link", "link"),
    new HeaderCategoriesDomPosts(".js--posts", "posts"),
  ];

  preloadPages = preloadPages;

  connectedCallback() {
    this.registerButtons();
  }

  disconnectedCallback() {
    for (const { button, eventListener } of this.buttonEventListeners) {
      button.removeEventListener("click", eventListener);
    }
  }

  buttonEventListeners: {
    button: HTMLElement;
    eventListener: () => void;
  }[] = [];

  registerButtons() {
    const buttons: NodeListOf<HTMLElement> = this.querySelectorAll(".js--category-button");
    buttons.forEach((button) => {
      const eventListener = () => {
        const data = this.extractButtonData(button);
        for (const domChange of this.domChanger) {
          domChange.handler(data);
        }
        this.preloadPages();
      };
      button.addEventListener("click", eventListener);
      this.buttonEventListeners.push({ button, eventListener });
    });
  }

  extractButtonData(button: HTMLElement): HeaderCategoriesData {
    let posts: HeaderCategoriesData["posts"] = [];
    let lastPosts = button.dataset.lastPosts || "[]";

    try {
      posts = JSON.parse(lastPosts);
    } catch (e) {
      throw new Error("Could not parse posts");
    }

    const data: HeaderCategoriesData = {
      title: button.textContent!,
      link: button.dataset.link!,
      description: button.dataset.description!,
      posts: posts,
    };

    const missingKeys = Object.keys(data).filter((key) => !data[key as keyof HeaderCategoriesData]);

    if (missingKeys.length > 0) {
      throw new Error("Missing data: " + missingKeys.join(", "));
    }

    return data;
  }
}
