export interface Category {
    uuid: string;
    name: string;
    selected: boolean;
}

export interface User {
    isLoggedIn: boolean;
    email: string;
    name: string;
}