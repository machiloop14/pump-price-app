// src/types/GooglePlace.ts

export interface GooglePlace {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  business_status?: string;
  types: string[];

  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };

  opening_hours?: {
    open_now: boolean;
  };

  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
}
