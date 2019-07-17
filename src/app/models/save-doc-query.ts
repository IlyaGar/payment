export class SaveDocQuery{
    constructor(
        public token: string,
        public docNum: string,
        public docName: string,
        public docStatus: string,
        public docBody: Array<Array<string>>,
    ){}
}
