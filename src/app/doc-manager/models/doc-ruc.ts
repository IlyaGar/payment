export class AddDogovorByRukovod {
    constructor(
        public token: string,
        /// <summary>
        /// Тип ДОГОВОРА ВЭД = 1, Договора поставки = 2
        /// </summary>
        public type: number,
        /// <summary>
        /// наименование контрагента
        /// </summary>
        public contragent: string,
        /// <summary>
        /// дата начала договора
        /// </summary>        
        public date_start: string,
        /// <summary>
        /// дата окончания договора
        /// </summary>        
        public date_end: string,
        /// <summary>
        /// сумма договора
        /// </summary>        
        public summa: string,
        /// <summary>
        /// Тип суммы: BYN, RUB, USD, EUR
        /// </summary>
        public summa_type: string,
        /// <summary>
        /// дата передачи оригинала
        /// </summary>        
        public date_post: string,
    ){}
}