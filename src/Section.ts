interface SectionConfig <T> { 
    items: T [];
    renderer: (item: T) => HTMLElement;
}

export class Section <T> {
    private _items: T []; 
    private _renderer: (item: T) => HTMLElement;
    private _container: HTMLElement;

    constructor(config: SectionConfig <T>, containerSelector:string) {
        this._items = config.items;
        this._renderer = config.renderer;
        this._container = document.querySelector(containerSelector) as HTMLElement;
    }
}



