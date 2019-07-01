export class DocumentsQuery{
    constructor(
        /// <summary>
        /// Ключ доступа
        /// </summary>
        public token: string,

        /// <summary>
        /// Отобрать по номеру
        /// </summary>
        public numParam: string,

        /// <summary>
        /// Отобрать по наименованию
        /// </summary>
        public nameParam: string,

        /// <summary>
        /// Отобрать по статусу
        /// </summary>
        public statusParam: string,

        /// <summary>
        /// Отобрать по дате с {дата}
        /// </summary>
        public dateFromParam: string,

        /// <summary>
        /// Отобрать по дате по {дата}
        /// </summary>
        public dateToParam: string,
    ){}
}