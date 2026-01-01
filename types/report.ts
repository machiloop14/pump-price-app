export type FuelType = "petrol" | "diesel" | "kerosene";

export interface CreateReportInput {
  placeId: string;
  stationName: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
  fuelType: FuelType;
  price: number;
}
