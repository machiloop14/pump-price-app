import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import FuelSelector from "../../components/fuelSelector";
import StationSearchInput from "../../components/stationSearchInput";
import { FuelType } from "../../types/fuels";
import { StationSearchResult } from "../../types/stationSearchResult";

export default function SubmitPriceScreen() {
  const [station, setStation] = useState<StationSearchResult | null>(null);
  const [fuelType, setFuelType] = useState<FuelType | null>(null);
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (!station || !fuelType || !price) {
      Alert.alert("Missing data", "Please complete all fields");
      return;
    }

    console.log(station);

    const payload = {
      placeId: station.place_id,
      stationName: station.name,
      lat: station.geometry.location.lat,
      lng: station.geometry.location.lng,
      fuelType,
      price: Number(price),
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitting price:", payload);

    Alert.alert("Success", "Price submitted (mock)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Fuel Price</Text>

      <StationSearchInput onSelect={setStation} />

      {station && <Text style={styles.selected}>Selected: {station.name}</Text>}

      <FuelSelector value={fuelType} onChange={setFuelType} />

      <TextInput
        placeholder="Enter price (₦)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <Button title="Submit Price" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  selected: {
    marginVertical: 8,
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
});
