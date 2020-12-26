// класс для прелставления данных автомобиля
export class CarViewData{
  // конструктор
  constructor(
    public id: number,  // id - авто
    public stateNumber: string, // гос. номер авто
    public color: string, // цвет авто
    public yearOfIssue: number, // год выпуска авто
    public markTitle: string, // марка авто
    public markModel: string, // модель авто
    public surname: string, // фамилия владельца
    public name: string, // имя владельца
    public patronymic: string, // отчество владельца
    public passport: string // паспорт владельца
  ){}
}
