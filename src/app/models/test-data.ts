export class TestData{
    constructor(
        public id: number,
        public contr: string,
        public saldo: string,
        public lastpay: string,
        public scrap: string,
        public debt: string,
        public pay: string,
        public note: string,
        public contracts: string[],
    ){}
}