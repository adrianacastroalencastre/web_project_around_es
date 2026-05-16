export class Popup {
    protected _popupElement: HTMLElement;

    constructor(popupSelector: string) {
        this._popupElement = document.querySelector(popupSelector) as HTMLElement;
    }

    //metodos publicos
    public open(): void {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    public close():void {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // metodo privado
    private _handleEscClose = (evt: KeyboardEvent): void => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    //
    public setEventListeners():void {
        this._popupElement.querySelector('.popup__close')?.addEventListener('click', () => {
            this.close();
        });

        this._popupElement.addEventListener('click', (evt: Event)=> {
            if (evt.target === this._popupElement) {
                this.close();
            }
        });
    }
}
