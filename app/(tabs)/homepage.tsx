// // app/index.tsx
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { fetchNearbyGasStations } from "../../services/googlePlaces";
// import { GasStation } from "../../types/GasStation";
// import { getCurrentLocation } from "../../utils/location";

// export default function HomeScreen() {
//   const [stations, setStations] = useState<GasStation[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadStations() {
//       try {
//         const coords = await getCurrentLocation();
//         const results = await fetchNearbyGasStations(
//           coords.latitude,
//           coords.longitude
//         );
//         setStations(results);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadStations();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={stations}
//         keyExtractor={(item) => item.place_id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.name}>{item.name}</Text>
//             <Text>{item.vicinity}</Text>
//             {item.rating && <Text>⭐ {item.rating}</Text>}
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     flex: 1,
//   },
//   card: {
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 8,
//     backgroundColor: "#eee",
//   },
//   name: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });
// src/app/index.tsx

import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import StationCard from "../../components/stationCard";
import { fetchNearbyGasStations } from "../../services/googlePlaces";
import { GooglePlace } from "../../types/GooglePlace";
import { delay } from "../../utils/delay";
import { getCurrentLocation } from "../../utils/location";

export default function HomeScreen() {
  const [stations, setStations] = useState<GooglePlace[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadInitialStations();
  }, []);

  const loadInitialStations = async () => {
    try {
      const coords = await getCurrentLocation();

      const data = await fetchNearbyGasStations(
        coords.latitude,
        coords.longitude
      );

      setStations(data.results);
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreStations = async () => {
    if (!nextPageToken || loadingMore) return;

    setLoadingMore(true);

    // Google requires delay before using next_page_token
    await delay(2000);

    const data = await fetchNearbyGasStations(
      undefined,
      undefined,
      nextPageToken
    );

    // Prevent duplicates
    setStations((prev) => {
      const map = new Map(prev.map((p) => [p.place_id, p]));
      data.results.forEach((p) => map.set(p.place_id, p));
      return Array.from(map.values());
    });

    setNextPageToken(data.nextPageToken);
    setLoadingMore(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => <StationCard station={item} />}
        onEndReached={loadMoreStations}
        onEndReachedThreshold={0.6}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
