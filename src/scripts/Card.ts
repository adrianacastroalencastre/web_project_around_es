interface CardData {
    name: string;
    link: string;
}

export class Card {
    private _data: CardData;
    private _templateSelector: string;
    private _handleCardClick: (name: string, link: string) => void;

    constructor(
        data: CardData,
        templateSelector: string,
        handleCardClick: (name: string, link: string) => void
    ) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
}