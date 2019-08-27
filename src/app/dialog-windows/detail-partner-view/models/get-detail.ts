export class GetDetail{
    constructor(
        public token: string,
        public inn: string,
        public name: string,
        public dateFrom: string,
        public dateTo: string,
    ){}
}