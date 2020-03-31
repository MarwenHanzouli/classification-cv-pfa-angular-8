export class Offre{
    constructor(
        public id:number,
        public titre:string,
        public dateOffre:Date,
        public dateFin:Date,
        public entreprise:string,
        public poste:string,
        public lieu:string,
        public typeOffre:string,
        public description:string,
        public anneeExperience:number,
        public niveauDemande:string,
        public etat:boolean,
        
    ){}
}