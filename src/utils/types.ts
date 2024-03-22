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

export interface UserInterest {
    uuid: string;
}

export interface UserSignupData {
    email: string;
    name: string;
    password: string;
}
