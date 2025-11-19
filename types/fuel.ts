export type FuelPrice = {
  fuelType: string;
  price: number;
  reportedBy: string;
  location: string;
  state: string;
  likes: string[];
  dislikes: string[];
  timeReported: string;
};

export type StationData = {
  id: string;
  stationName: string;
  prices: FuelPrice[];
};
