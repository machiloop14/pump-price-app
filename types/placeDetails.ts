export interface PlaceDetails {
  place_id: string;
  formatted_address: string;

  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];

  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
