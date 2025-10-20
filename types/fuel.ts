export type PriceReport = {
  fuelType: string;
  price: number;
  reportedBy: string;
  likes: number;
  dislikes: number;
  timeReported: string;
};

export type Station = {
  stationName: string;
  location: string;
  prices: PriceReport[];
};
