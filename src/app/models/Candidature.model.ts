export class Candidature{
    constructor(
        public commentaire:string,
        public etat:boolean=true,
        public idCandidat:number,
        public idCv:number,
        public idOffre:number,
        public id?:number,
    ){}
}