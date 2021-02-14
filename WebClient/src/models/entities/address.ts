export class Address {
  constructor(
    public id: number,  // id адреса
    public street: string, // улица
    public building: string, // здание
    public flat: number | undefined, // квартира (необязательна т.к. может быть частный дом)
  ){}
}
