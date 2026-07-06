export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.name = data.name;
        this.link = data.link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        var _a;
        const templateElement = document.querySelector(this.templateSelector);
        const cardElement = (_a = templateElement.content.querySelector(".card")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
        return cardElement;
    }
    handleLikeClick(likeButton) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    handleDeleteClick(cardElement) {
        cardElement.remove();
    }
    setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            this.handleLikeClick(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this.handleDeleteClick(cardElement);
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.name, this.link);
        });
    }
    generateCard() {
        const cardElement = this.getTemplate();
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        cardTitle.textContent = this.name;
        cardImage.src = this.link;
        cardImage.alt = this.name;
        this.setEventListeners(cardElement);
        return cardElement;
    }
}
