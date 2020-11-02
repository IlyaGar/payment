export class EditDogovorByOffice {
    constructor(
        public token: string,
        /// <summary>
        /// Тип ДОГОВОРА ВЭД = 1, Договора поставки = 2
        /// </summary>
        public type: number,
        /// <summary>
        /// уникальный ключ для определения записи редактирования
        /// </summary>
        public key: string,
        /// <summary>
        /// дата получения оригинала договора
        /// </summary>      
        public date_get: string,
        /// <summary>
        /// ссылка на скан договора
        /// </summary>      
        public file_link: string,
    ){}
}