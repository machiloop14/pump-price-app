import axios from "axios";
import { GooglePlace } from "../types/GooglePlace";

const API_KEY = "AIzaSyBe-E5Chhe9sjZodUcWHvlIjTLzArGG_T0";

interface PlacesResponse {
  results: GooglePlace[];
  nextPageToken: string | null;
}

export async function fetchNearbyGasStations(
  latitude?: number,
  longitude?: number,
  pageToken?: string
): Promise<PlacesResponse> {
  const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

  const params: any = {
    key: API_KEY,
  };

  if (pageToken) {
    // pagination request
    params.pagetoken = pageToken;
  } else {
    // first request
    params.location = `${latitude},${longitude}`;
    params.radius = 5000;
    params.type = "gas_station";
  }

  const response = await axios.get(url, { params });

  return {
    results: response.data.results,
    nextPageToken: response.data.next_page_token || null,
  };
}
