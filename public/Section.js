export class Section {
    constructor(config, containerSelector) {
        this._items = config.items;
        this._renderer = config.renderer;
        this._container = document.querySelector(containerSelector);
    }
}
