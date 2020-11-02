export class InputRow{
    constructor(
        public date_start: Date,
        public date_end: Date,
        public date_post: Date,
        public summa: string,
        public summa_type: string,
        public selectedContr: string,
    ){}

    /**
     * isAllFieldOk
     */
    public isAllFieldOk() {
        if( this.selectedContr || 
            this.date_start ||
            this.date_end || 
            this.date_post ||
            this.summa || 
            this.summa_type) {

            }
    }
}