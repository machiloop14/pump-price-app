// // src/types/GooglePlace.ts

// export interface GooglePlace {
//   place_id: string;
//   name: string;
//   vicinity: string;
//   rating?: number;
//   user_ratings_total?: number;
//   business_status?: string;
//   types: string[];

//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };

//   opening_hours?: {
//     open_now: boolean;
//   };

//   photos?: {
//     photo_reference: string;
//     height: number;
//     width: number;
//   }[];
// }
// src/types/GooglePlace.ts

// export interface GooglePlace {
//   place_id: string;
//   name: string;
//   vicinity: string;

//   rating?: number;
//   user_ratings_total?: number;
//   business_status?: string;

//   types: string[];

//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };

//   opening_hours?: {
//     open_now: boolean;
//   };

//   photos?: {
//     photo_reference: string;
//     height: number;
//     width: number;
//   }[];

//   // 👇 computed locally (not from Google)
//   distanceKm?: number;
// }
// src/types/GooglePlace.ts

export interface Report {
  id: string;
  fuelType: "petrol" | "diesel" | "kerosene";
  price: number;
  userId: string;
  likes: string[];
  dislikes: string[];
  submittedAt: any;
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
