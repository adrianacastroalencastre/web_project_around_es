export class Popup {
    constructor(popupSelector) {
        // metodo privado
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        };
        this._popupElement = document.querySelector(popupSelector);
    }
    //metodos publicos
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    //
    setEventListeners() {
        var _a;
        (_a = this._popupElement.querySelector('.popup__close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.close();
        });
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target === this._popupElement) {
                this.close();
            }
        });
    }
}
