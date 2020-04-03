import { Organisme } from './Organisme.model';
import { TypeOffre } from './enums/type-offre.enum';
import { Niveau } from './enums/niveau.enum';

export class Offre{
    constructor(
        public titre:string,
        public dateOffre:Date,
        public dateFin:Date,
        public organisme:Organisme,
        public poste:string,
        public lieu:string,
        public typeOffre:TypeOffre,
        public description:string,
        public anneeExperience:number,
        public niveauDemande:Niveau,
        public etat:boolean=true,
        public idManager:number,
        public id?:number
    ){}
}