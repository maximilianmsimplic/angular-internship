export class Vehicle {
  constructor(
    public id: string,
    public registrationPlate: string,
    public brand: string[],
    public model: string,
    public registrationDate: Date,
    public mileage: number,
    public isInsured: boolean,
    public ownerMail: string
  ) {}
}
