import { Role } from "./role";

export interface User {
    id : number;
    name : string;
    username : string;
    password : string;
    cpassword : string;
    role: Role;
    token?: string;
}