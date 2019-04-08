export class Fillup {
  id: number;
  date: string;
  odometer: number;
  pricePerGallon: number;
  gallons: number;

  constructor(id: number = 0,
              date: string = '',
              odometer: number = 0,
              price: number = 0,
              gallons: number = 0) {
    id = this.id;
    date = this.date;
    odometer = this.odometer;
    price = this.pricePerGallon;
    gallons = this.gallons;
    }
}
