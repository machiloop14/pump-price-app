// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

// import StationCard from "../../components/stationCard";
// import { fetchNearbyGasStations } from "../../services/googlePlaces";
// import { GooglePlace } from "../../types/GooglePlace";
// import { delay } from "../../utils/delay";
// import { getCurrentLocation } from "../../utils/location";

// export default function HomeScreen() {
//   const [stations, setStations] = useState<GooglePlace[]>([]);
//   const [nextPageToken, setNextPageToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   useEffect(() => {
//     loadInitialStations();
//   }, []);

//   const loadInitialStations = async () => {
//     try {
//       const coords = await getCurrentLocation();

//       const data = await fetchNearbyGasStations(
//         coords.latitude,
//         coords.longitude
//       );

//       setStations(data.results);
//       setNextPageToken(data.nextPageToken);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreStations = async () => {
//     if (!nextPageToken || loadingMore) return;

//     setLoadingMore(true);

//     // Google requires delay before using next_page_token
//     await delay(2000);

//     const data = await fetchNearbyGasStations(
//       undefined,
//       undefined,
//       nextPageToken
//     );

//     // Prevent duplicates
//     setStations((prev) => {
//       const map = new Map(prev.map((p) => [p.place_id, p]));
//       data.results.forEach((p) => map.set(p.place_id, p));
//       return Array.from(map.values());
//     });

//     setNextPageToken(data.nextPageToken);
//     setLoadingMore(false);
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={stations}
//         keyExtractor={(item) => item.place_id}
//         renderItem={({ item }) => <StationCard station={item} />}
//         onEndReached={loadMoreStations}
//         onEndReachedThreshold={0.6}
//         ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
// });

// src/app/index.tsx

import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import StationCard from "../../components/stationCard";
import { fetchNearbyGasStations } from "../../services/googlePlaces";
import { GooglePlace } from "../../types/GooglePlace";
import { delay } from "../../utils/delay";
import { calculateDistanceKm } from "../../utils/distance";
import { getCurrentLocation } from "../../utils/location";

export default function HomeScreen() {
  const [stations, setStations] = useState<GooglePlace[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    loadInitialStations();
  }, []);

  const loadInitialStations = async () => {
    try {
      const coords = await getCurrentLocation();
      setUserLocation(coords);

      const data = await fetchNearbyGasStations(
        coords.latitude,
        coords.longitude
      );

      const enriched = addDistanceAndSort(data.results, coords);

      setStations(enriched);
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreStations = async () => {
    if (!nextPageToken || loadingMore || !userLocation) return;

    setLoadingMore(true);
    await delay(2000);

    const data = await fetchNearbyGasStations(
      undefined,
      undefined,
      nextPageToken
    );

    const enriched = addDistanceAndSort(data.results, userLocation);

    setStations((prev) => {
      const map = new Map(prev.map((p) => [p.place_id, p]));
      enriched.forEach((p) => map.set(p.place_id, p));

      return Array.from(map.values()).sort(
        (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0)
      );
    });

    setNextPageToken(data.nextPageToken);
    setLoadingMore(false);
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
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

/**
 * Adds distance (km) and sorts ascending
 */
function addDistanceAndSort(
  places: GooglePlace[],
  userLocation: { latitude: number; longitude: number }
): GooglePlace[] {
  return places
    .map((place) => ({
      ...place,
      distanceKm: calculateDistanceKm(
        userLocation.latitude,
        userLocation.longitude,
        place.geometry.location.lat,
        place.geometry.location.lng
      ),
    }))
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
