// Usuario - name, about, avatar, _id
// Tarjeta - _id, nsame, link, owner, isLiked, createdAt

export interface UserData {
    name: string;
    about: string;
    avatar: string; 
    _id: string;
}

export interface CardData {
    _id: string;
    name: string; 
    link: string;
    owner: string;
    createdAt: string;
    isLiked: boolean;
}