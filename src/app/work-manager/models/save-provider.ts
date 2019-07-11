export class SaveProvider{
    constructor(
        public token: string,
        public docNum: string,
        public provList: Array<string>,
    ){}
}