export type FuelPrice = {
  id: string;
  fuelType: string;
  price: number;
  reportedBy: string;
  location: string;
  state: string;
  likes: string[];
  dislikes: string[];
  timeReported: string;
  trustScore: number;
  status: string;
};

export type StationData = {
  id: string;
  stationName: string;
  prices: FuelPrice[];
};
