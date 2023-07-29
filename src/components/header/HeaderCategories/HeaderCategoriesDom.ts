import type { HeaderCategoriesData } from "./HeaderCategories";

export abstract class HeaderCategoriesDomHandler {
  private domElements: NodeListOf<Element>;
  constructor(private selector: string, private contentAtr: keyof HeaderCategoriesData) {
    if (!this.selector || this.selector.length === 0) {
      throw new Error("Selector is empty");
    }

    if (!this.contentAtr || this.contentAtr.length === 0) {
      throw new Error("Content attribute is empty");
    }

    this.domElements = document.querySelectorAll(selector);

    if (this.domElements.length === 0) {
      throw new Error("No dom elements found");
    }

    this.handler = this.handler.bind(this);
  }

  handler(data: HeaderCategoriesData) {
    const content = data[this.contentAtr];
    this.domElements.forEach((domElement) => {
      this.setDomContent(domElement, content);
    });
  }

  abstract setDomContent(domElement: Element, content: any): void;
}

export class HeaderCategoriesDomString extends HeaderCategoriesDomHandler {
  setDomContent(domElement: Element, content: string): void {
    domElement.textContent = content;
  }
}

export class HeaderCategoriesDomLinkHref extends HeaderCategoriesDomHandler {
  setDomContent(domElement: Element, content: string) {
    if (domElement instanceof HTMLAnchorElement) {
      domElement.href = content;
    }
  }
}

export class HeaderCategoriesDomPosts extends HeaderCategoriesDomHandler {
  setDomContent(domElement: Element, content: { title: string; link: string }[]) {
    let postHtml = "";

    if (content.length === 0) {
      content.push({ title: "Keine Beiträge, schau später wieder vorbei!", link: "#" });
    }

    for (const post of content) {
      postHtml += `<a href="${post.link}" data-swup-preload>
            <div class="post border shadow shadow--hover">
              <div class="post__title">${post.title}</div>
            </div>
          </a>`;
    }

    domElement.innerHTML = postHtml;
  }
}
