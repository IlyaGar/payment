export class DocEdit{
    constructor(
        //права пользователя
        public accessRight: string,
        public docNum: string,
        public docName: string,
        public docDate: string,
        public docSum: string,
        public docStatus: string,
        public docBody: Array<Array<any>>,
    ){}

    clone() {
        var cloned = new DocEdit(this.accessRight, this.docNum, this.docName, this.docDate, this.docSum, this.docStatus, this.docBody); //pass appropriate constructor args
        //make other necessary changes to make the state match
        return cloned;
    }
}