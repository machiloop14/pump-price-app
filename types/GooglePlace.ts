export interface Report {
  id: string;
  fuelType: "petrol" | "diesel" | "kerosene";
  price: number;
  userId: string;
  likes: string[];
  dislikes: string[];
  submittedAt: any;
  trustScore: number;
  trustStatus: "valid" | "suspicious" | "rejected";
}

export interface GooglePlace {
  place_id: string;
  name: string;
  vicinity?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  opening_hours?: { open_now: boolean };
  distanceKm?: number;

  // new optional field
  reports?: Report[];
}
