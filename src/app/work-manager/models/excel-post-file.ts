import { DocEditQuery } from 'src/app/models/doc-edit-query';

export class ExcelPostFle{
    constructor(
        public  doc: DocEditQuery,
        public  file: FormData,
    ){}
}