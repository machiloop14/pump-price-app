export type FuelPrice = {
  fuelType: string;
  price: number;
  reportedBy: string;
  location: string;
  state: string;
  likes: number;
  dislikes: number;
  timeReported: string;
};

export type StationData = {
  stationName: string;
  prices: FuelPrice[];
};
