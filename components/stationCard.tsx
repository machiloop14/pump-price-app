// src/components/StationCard.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlace } from "../types/GooglePlace";

interface Props {
  station: GooglePlace;
}

export default function StationCard({ station }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{station.name}</Text>
      <Text>{station.vicinity}</Text>

      {station.rating && <Text>⭐ {station.rating}</Text>}

      {station.opening_hours && (
        <Text>{station.opening_hours.open_now ? "Open now" : "Closed"}</Text>
      )}
      {station.distanceKm !== undefined && (
        <Text>{station.distanceKm.toFixed(2)} km away</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
