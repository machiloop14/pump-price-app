// services/googlePlaces.ts
import axios from "axios";
import { GasStation } from "../types/GasStation";

const API_KEY = "AIzaSyBe-E5Chhe9sjZodUcWHvlIjTLzArGG_T0";

export async function fetchNearbyGasStations(
  latitude: number,
  longitude: number
): Promise<GasStation[]> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

  const response = await axios.get(url, {
    params: {
      location: `${latitude},${longitude}`,
      radius: 5000, // meters
      type: "gas_station",
      key: API_KEY,
    },
  });

  return response.data.results;
}
