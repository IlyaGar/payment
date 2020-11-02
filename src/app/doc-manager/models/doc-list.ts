export class GetListOfDogovor {
    constructor(
        public token: string,
        /// <summary>
        /// Тип ДОГОВОРА ВЭД = 1, Договора поставки = 2
        /// </summary>
        public type: number,
        /// <summary>
        /// уникальный ключ записи для редатирования
        /// </summary>
        public key: string,
        /// <summary>
        /// дата начала договора
        /// </summary>        
        public date_from: string,
        /// <summary>
        /// дата окончания договора
        /// </summary>        
        public date_to: string,
        /// <summary>
        /// наименование контрагента ДЛЯ поиска
        /// </summary>  
        public contragent: string,
      
        public current: number,
        /// <summary>
        /// наименование колонки для сортировки
        /// </summary>     
        public column: string,
        /// <summary>
        /// desc, null
        /// </summary>
        public order_type: string,
    ){}
}