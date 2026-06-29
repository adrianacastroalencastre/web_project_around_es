export interface CardData {
    name: string;
    link: string;
}

export class Card {
    private name: string;
    private link: string;
    private templateSelector: string;
    private handleCardClick: (name: string, link: string) => void;

     constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this.name = data.name;
    this.link = data.link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const templateElement = document.querySelector(
      this.templateSelector
    ) as HTMLTemplateElement;

    const cardElement = templateElement.content.querySelector(
      ".card"
    )?.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private handleLikeClick(likeButton: HTMLButtonElement): void {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  private handleDeleteClick(cardElement: HTMLElement): void {
    cardElement.remove();
  }

  private setEventListeners(cardElement: HTMLElement): void {
    const likeButton = cardElement.querySelector(
      ".card__like-button"
    ) as HTMLButtonElement;
    const deleteButton = cardElement.querySelector(
      ".card__delete-button"
    ) as HTMLButtonElement;
    const cardImage = cardElement.querySelector(
      ".card__image"
    ) as HTMLImageElement;

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

  public generateCard(): HTMLElement {
    const cardElement = this.getTemplate();
    const cardTitle = cardElement.querySelector(".card__title") as HTMLElement;
    const cardImage = cardElement.querySelector(
      ".card__image"
    ) as HTMLImageElement;

    cardTitle.textContent = this.name;
    cardImage.src = this.link;
    cardImage.alt = this.name;

    this.setEventListeners(cardElement);

    return cardElement;
    }

}

