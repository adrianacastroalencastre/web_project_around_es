export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
}
