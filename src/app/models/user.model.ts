export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    passwordMatch: boolean;
}