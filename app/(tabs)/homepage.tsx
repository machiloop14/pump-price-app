// app/index.tsx
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchNearbyGasStations } from "../../services/googlePlaces";
import { GasStation } from "../../types/GasStation";
import { getCurrentLocation } from "../../utils/location";

export default function HomeScreen() {
  const [stations, setStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStations() {
      try {
        const coords = await getCurrentLocation();
        const results = await fetchNearbyGasStations(
          coords.latitude,
          coords.longitude
        );
        setStations(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStations();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.vicinity}</Text>
            {item.rating && <Text>⭐ {item.rating}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  card: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
