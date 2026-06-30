interface SectionConfig <T> { 
    items: T [];
    renderer: (item: T) => void;
}
export class Section<T> {
  private items: T[];
  private _renderer: (item: T) => void;
  private container: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string
  ) {
    this.items = items;
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector) as HTMLElement;
  }

  public renderItems(): void {
    this.items.forEach((item) => {
      this._renderer(item);
    });
  } 
  
  public addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}



