export class DocumentItem{
    constructor(
        public nomer: string,
        public name: string,
        public status: string,
        public user: string,
        public date: Date,
        public summ: string,
    ){}
}