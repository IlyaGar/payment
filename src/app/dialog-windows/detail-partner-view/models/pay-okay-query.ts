export class PayOkayQuery{
    constructor(
        public token: string, 
        public unp: string, 
        public payDay: string, 
        public payPay: string, 
        public payNum: string,
    ){}
}