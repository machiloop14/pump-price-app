// import React, { useState } from "react";
// import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

// import FuelSelector from "../../components/fuelSelector";
// import StationSearchInput from "../../components/stationSearchInput";
// import { FuelType } from "../../types/fuels";
// import { StationSearchResult } from "../../types/stationSearchResult";

// export default function SubmitPriceScreen() {
//   const [station, setStation] = useState<StationSearchResult | null>(null);
//   const [fuelType, setFuelType] = useState<FuelType | null>(null);
//   const [price, setPrice] = useState("");

//   const handleSubmit = () => {
//     if (!station || !fuelType || !price) {
//       Alert.alert("Missing data", "Please complete all fields");
//       return;
//     }

//     console.log(station);

//     const payload = {
//       placeId: station.place_id,
//       stationName: station.name,
//       lat: station.geometry.location.lat,
//       lng: station.geometry.location.lng,
//       address: station.formatted_address,
//       fuelType,
//       price: Number(price),
//       submittedAt: new Date().toISOString(),
//     };

//     console.log("Submitting price:", payload);

//     Alert.alert("Success", "Price submitted (mock)");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Submit Fuel Price</Text>

//       <StationSearchInput onSelect={setStation} />

//       {station && <Text style={styles.selected}>Selected: {station.name}</Text>}

//       <FuelSelector value={fuelType} onChange={setFuelType} />

//       <TextInput
//         placeholder="Enter price (₦)"
//         keyboardType="numeric"
//         value={price}
//         onChangeText={setPrice}
//         style={styles.input}
//       />

//       <Button title="Submit Price" onPress={handleSubmit} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   selected: {
//     marginVertical: 8,
//     fontStyle: "italic",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 6,
//     marginBottom: 16,
//   },
// });

import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Fuel Price</Text>

      <StationSearchInput onSelect={handleSelectStation} />

      {station && (
        <>
          <Text style={styles.selected}>Station: {station.name}</Text>
          {stateName && <Text style={styles.state}>State: {stateName}</Text>}
        </>
      )}

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
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    fontSize: 14,
    color: "#555",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginVertical: 12,
    fontSize: 16,
  },
});
