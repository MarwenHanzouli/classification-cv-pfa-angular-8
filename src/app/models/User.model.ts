import { Address } from "./Address.model";

export class User{
    constructor(
        public username:string,
        public password:string,
        public repassword:string,
        public email:string,
        public name: string,
        public lastName: string,
        public telephone:string,
        public roleName:string,
        public address?: Address,
        public niveau?:string,
        public diplome?:string,
        public institut?:string,
        public date_naissance?:string,
        public nameEntreprise?:string
    ){}
}