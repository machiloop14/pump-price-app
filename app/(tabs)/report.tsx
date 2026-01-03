import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "@/context/auth";
import FuelSelector from "../../components/fuelSelector";
import StationSearchInput from "../../components/stationSearchInput";
import { fetchPlaceDetails } from "../../services/placeDetails";
import { FuelType } from "../../types/fuels";
import { StationSearchResult } from "../../types/stationSearchResult";
import { extractState } from "../../utils/extractState";

import { submitReport } from "../../services/reportService";

export default function SubmitPriceScreen() {
  const [station, setStation] = useState<StationSearchResult | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [fuelType, setFuelType] = useState<FuelType | null>(null);
  const [price, setPrice] = useState("");

  const { user } = useAuth();

  const handleSelectStation = async (selected: StationSearchResult) => {
    setStation(selected);

    try {
      const details = await fetchPlaceDetails(selected.place_id);
      const state = extractState(details.address_components);
      setStateName(state);
    } catch (err) {
      console.error("Failed to fetch place details", err);
      setStateName(null);
    }
  };

  //   const handleSubmit = () => {
  //     if (!station || !fuelType || !price || !stateName) {
  //       Alert.alert("Missing data", "Please complete all fields");
  //       return;
  //     }

  //     const payload = {
  //       placeId: station.place_id,
  //       stationName: station.name,
  //       latitude: station.geometry.location.lat,
  //       longitude: station.geometry.location.lng,
  //       address: station.formatted_address,
  //       state: stateName,
  //       fuelType,
  //       price: Number(price),
  //       submittedAt: new Date().toISOString(),
  //     };

  //     console.log("Submitting:", payload);

  //     Alert.alert("Success", "Price submitted successfully(mock)");
  //   };

  const handleSubmit = async () => {
    if (!station || !fuelType || !price || !stateName) {
      Alert.alert("Missing data", "Please complete all fields");
      return;
    }

    if (!user) return;

    try {
      await submitReport(user.uid, {
        placeId: station.place_id,
        stationName: station.name,
        state: stateName,
        address: station.formatted_address,
        lat: station.geometry.location.lat,
        lng: station.geometry.location.lng,
        fuelType,
        price: Number(price),
      });

      alert("Report submitted successfully");
      setStation(null);
      setFuelType(null);
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit report");
    }
  };

  const image = require("../../assets/images/mapview.jpg");

  return (
    <View className="flex-1">
      <ImageBackground source={image} resizeMode="cover" className="flex-1">
        <View
          style={styles.container}
          className="bg-[#f7fbff] flex gap-3 w-11/12 mx-auto mt-3 elevation-md  rounded-lg"
        >
          <View>
            <StationSearchInput onSelect={handleSelectStation} />

            {station && (
              <View>
                <Text style={styles.selected} className="font-semibold text-sm">
                  {station.name}
                </Text>
                <Text style={styles.state} className=" italic  tex">
                  {station.formatted_address}
                </Text>
              </View>
            )}
          </View>

          <FuelSelector value={fuelType} onChange={setFuelType} />

          <TextInput
            placeholder="Enter price (₦)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
          />
          <View>
            <Pressable
              onPress={handleSubmit}
              className="bg-[#0a66ff] px-2 py-3 rounded-md "
            >
              <Text className="text-center text-white font-medium">
                Submit Report
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    shadowColor: "#000",
    // backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  selected: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
  },

  state: {
    marginTop: 4,
    fontSize: 12,
    color: "#99a8bc",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e4e7eb",
    backgroundColor: "#f7fbff",
    borderRadius: 6,
    padding: 12,
    marginVertical: 12,
    fontSize: 16,
  },
});
