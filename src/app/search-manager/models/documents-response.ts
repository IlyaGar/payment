export class DocumentsResponse{
    constructor(
    /// <summary>
    /// Перечень документов
    /// </summary>
    public  docList: Array<Array<string>>,

    /// <summary>
    /// Кол-во документов
    /// </summary>
    public docCount: string,
    
    /// <summary>
    /// Общая сумма
    /// </summary>
    public docSum: string,
    ){}
}