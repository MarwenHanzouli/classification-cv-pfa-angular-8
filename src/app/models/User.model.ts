import { Address } from "./Address.model";
import { Photo } from './Photo.model';

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
        public id?:number,
        public photo?:Photo,
        public active?:number,
        public isLoacked?:boolean,
        public isExpired?:boolean,
        public isEnabled?:boolean,
        public address?: Address,
        public niveau?:string,
        public diplome?:string,
        public institut?:string,
        public date_naissance?:string,
        public nameEntreprise?:string,
        public token?:string
    ){}
}