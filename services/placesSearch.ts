import axios from "axios";
import { StationSearchResult } from "../types/stationSearchResult";

const API_KEY = "AIzaSyBe-E5Chhe9sjZodUcWHvlIjTLzArGG_T0";

export async function searchStations(query: string) {
  if (!query.trim()) return [];

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/textsearch/json",
    {
      params: {
        query,
        type: "gas_station",
        key: API_KEY,
      },
    }
  );

  return response.data.results as StationSearchResult[];
}
