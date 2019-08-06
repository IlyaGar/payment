export class PayDelQuery{
    constructor(
        public token: string, 
        public payDay: string, 
        public payPay: string, 
        public payNum: string, 
        public payKey: string, 
    ){}
}