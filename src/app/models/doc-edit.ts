export class DocEdit{
    constructor(
        //права пользователя
        public accessRight: string,
        public docNum: string,
        public docName: string,
        public docDate: string,
        public docSum: string,
        public docBody: Array<Array<string>>,
        public docStatus: string,
    ){}
}