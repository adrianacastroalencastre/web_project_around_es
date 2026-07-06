export class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this.handleEscClose = this.handleEscClose.bind(this);
    }
    handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target === this.popupElement) {
                this.close();
            }
        });
    }
}
