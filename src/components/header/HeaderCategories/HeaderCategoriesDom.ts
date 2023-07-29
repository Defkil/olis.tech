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
  template = document.querySelector("#header-categories-post") as HTMLTemplateElement;
  setDomContent(domElement: Element, content: { title: string; link: string }[]) {
    const elements: DocumentFragment[] = [];

    if (content.length === 0) {
      content.push({ title: "Keine Beiträge, schau später wieder vorbei!", link: "#" });
    }

    for (const post of content) {
      const clone = this.template.content.cloneNode(true) as DocumentFragment;
      clone.querySelector("a")!.href = post.link;
      clone.querySelector(".post__title")!.textContent = post.title;
      elements.push(clone);
    }

    domElement.innerHTML = "";
    domElement.append(...elements);
  }
}
