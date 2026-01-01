import axios from "axios";
import { PlaceDetails } from "../types/placeDetails";

const API_KEY = "AIzaSyBe-E5Chhe9sjZodUcWHvlIjTLzArGG_T0";

export async function fetchPlaceDetails(placeId: string) {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    {
      params: {
        place_id: placeId,
        fields: "place_id,formatted_address,address_components,geometry",
        key: API_KEY,
      },
    }
  );

  return response.data.result as PlaceDetails;
}
