export class Vehicle {
  constructor(
    public Id: string,
    public RegistrationPlate: string,
    public Brand: string[],
    public Model: string,
    public RegistrationDate: Date,
    public Mileage: number,
    public IsInsured: boolean,
    public OwnerMail: string
  ) {}
}

export const tempArray: Vehicle[] = [];
