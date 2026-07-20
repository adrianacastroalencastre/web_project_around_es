export interface ValidationConfig {
    inputSelector: string;  
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
}
export interface UserData {
    name: string;
    about: string;
    avatar: string; 
}

export interface CardData {
    _id: string;
    name: string; 
    link: string;
    owner: string;
    createdAt: string;
    isLiked: boolean;
}

export interface AvatarFormData {
    avatar: string;
}

export interface CardFormData {
    "place-name": string;
    link: string;
}   
