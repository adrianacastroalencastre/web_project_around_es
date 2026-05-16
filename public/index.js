"use strict";
// instancia de section
const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card(cardData, '#card-template', handleCardClick);
        return card.generateCard();
    }
}, '.cards__list');
// renderizar all tarjetas
cardSection.renderItems();
