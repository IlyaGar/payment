export class DetailResponse{
    constructor(
        public startSaldo: string,
        public endSaldo: string,
        public docIn: Array<Array<string>>,
        public docOut: Array<Array<string>>,
        public prixod: string,
        public vozvrat: string,
        public vzaim: string,
        public oplat : string,
    ){}
}
