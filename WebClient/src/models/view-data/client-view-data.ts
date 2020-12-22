
// класс для представления данных клиента
export class ClientViewData{
  // данный синтаксис является более правильным для angular и TypeScript
  // это не я придумал, жаловалсь среда разработки)
  constructor(
    public id: number,  // id - клиента
    public surname: string, // фамилия клиента
    public name: string, // имя клиента
    public patronymic: string, // отчество клиенат
    public passport: string, // паспорт клиента
    public dateOfBorn: Date, // дата рождения клиента
    public telephoneNumber: string, // номер телефона клиент
    public street: string, // улица проживания клиента
    public building: string, // здание в котором проживает клиент
    public flat: number | undefined, // квартира. undefined потому что может быть частный дом
  ){}
}
