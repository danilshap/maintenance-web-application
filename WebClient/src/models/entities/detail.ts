// класс для деталей
export class Detail{
  // конструктор
  constructor(
    public id: number,  // id - детали
    public title: string, // название
    public price: number, // стоимость
    public malfunctions: [] // массив неисправностей. По сути он не нужен
    // но чтобы соответствовать ответу от сервера то мы добавим данное поле
  ) {}
}
