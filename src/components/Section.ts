import type { CardData } from "../types/types";

interface SectionConfig <T> { 
    items: T [];
    renderer: (item: T) => void;
}
export class Section<T> {
  private items: T[];
  private renderer: (item: T) => void;
  private container: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string
  ) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector) as HTMLElement;
  }

  public renderItems(initialCards: CardData[]): void {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  } 
  
  public addItem(element: HTMLElement): HTMLElement {
    this.container.prepend(element);
    return element;
  }
}



