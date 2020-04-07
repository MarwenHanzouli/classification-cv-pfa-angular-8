import { Fichier } from './Fichier.model';

export class Cv{
    constructor(
        public cvParser:string,
        public fichier: Fichier,
        public etat:boolean=true,
        public idCandidat:number,
        public id?:number
    ){}
}