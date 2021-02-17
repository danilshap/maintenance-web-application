export class Person {
  constructor(
    public id: number,
    public surname: string, // фамилия
    public name: string, // имя
    public patronymic: string, // отчество
    public passport: string
  ){}
}
