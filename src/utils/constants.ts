import type { CardData, ValidationConfig } from "../types/types.js";
export interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export const initialCards: CardData[] = [
  {
    _id: "1",
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "",
    createdAt: "",
    isLiked: false
  },
  {
    _id: "2",
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "",
    createdAt: "",
    isLiked: false
  },
  {
    _id: "3",
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    owner: "",
    createdAt: "",
    isLiked: false
  },
  {
    _id: "4",
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    owner: "",
    createdAt: "",
    isLiked: false
  },
  {
    _id: "5",
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    owner: "",
    createdAt: "",
    isLiked: false
  },
  {
    _id: "6",
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    owner: "",
    createdAt: "",
    isLiked: false
  },
];

export const defaultFormConfig: ValidationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


