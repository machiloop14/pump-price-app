// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

// import StationCard from "../../components/stationCard";
// import { fetchNearbyGasStations } from "../../services/googlePlaces";
// import { listenToReportsForStation } from "../../services/reportQueries";
// import { GooglePlace } from "../../types/GooglePlace";
// import { delay } from "../../utils/delay";
// import { calculateDistanceKm } from "../../utils/distance";
// import { getCurrentLocation } from "../../utils/location";

// export default function HomeScreen() {
//   const [stations, setStations] = useState<GooglePlace[]>([]);
//   const [nextPageToken, setNextPageToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const [userLocation, setUserLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);

//   useEffect(() => {
//     loadInitialStations();
//   }, []);

//   // Hold unsubscribe functions for Firestore listeners
//   const listenersRef = React.useRef<(() => void)[]>([]);

//   useEffect(() => {
//     // Clean up listeners on unmount
//     return () => {
//       listenersRef.current.forEach((unsub) => unsub());
//       listenersRef.current = [];
//     };
//   }, []);

//   const loadInitialStations = async () => {
//     try {
//       const coords = await getCurrentLocation();
//       setUserLocation(coords);

//       const data = await fetchNearbyGasStations(
//         coords.latitude,
//         coords.longitude
//       );

//       const enriched = addDistanceAndSort(data.results, coords);

//       // Attach Firestore listeners
//       const stationsWithListeners = enriched.map((place) => ({
//         ...place,
//         reports: [],
//       }));
//       setStations(stationsWithListeners);

//       // attach real-time report listeners
//       stationsWithListeners.forEach((station) => {
//         const unsubscribe = listenToReportsForStation(
//           station.place_id,
//           (reports) => {
//             setStations((prev) =>
//               prev.map((s) =>
//                 s.place_id === station.place_id ? { ...s, reports } : s
//               )
//             );
//           }
//         );
//         listenersRef.current.push(unsubscribe);
//       });

//       setNextPageToken(data.nextPageToken);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreStations = async () => {
//     if (!nextPageToken || loadingMore || !userLocation) return;

//     setLoadingMore(true);
//     await delay(2000);

//     const data = await fetchNearbyGasStations(
//       undefined,
//       undefined,
//       nextPageToken
//     );
//     const enriched = addDistanceAndSort(data.results, userLocation);

//     const stationsWithListeners = enriched.map((place) => ({
//       ...place,
//       reports: [],
//     }));

//     setStations((prev) => {
//       const map = new Map(prev.map((p) => [p.place_id, p]));
//       stationsWithListeners.forEach((p) => map.set(p.place_id, p));
//       return Array.from(map.values()).sort(
//         (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0)
//       );
//     });

//     // Attach listeners for newly loaded stations
//     stationsWithListeners.forEach((station) => {
//       // Skip if already has a listener
//       if (listenersRef.current.some((_) => _.toString() === station.place_id))
//         return;

//       const unsubscribe = listenToReportsForStation(
//         station.place_id,
//         (reports) => {
//           setStations((prev) =>
//             prev.map((s) =>
//               s.place_id === station.place_id ? { ...s, reports } : s
//             )
//           );
//         }
//       );
//       listenersRef.current.push(unsubscribe);
//     });

//     setNextPageToken(data.nextPageToken);
//     setLoadingMore(false);
//   };

//   if (loading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         style={{ flex: 1, justifyContent: "center" }}
//       />
//     );
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

// /**
//  * Adds distance (km) to each station and sorts ascending
//  */
// function addDistanceAndSort(
//   places: GooglePlace[],
//   userLocation: { latitude: number; longitude: number }
// ) {
//   return places
//     .map((place) => ({
//       ...place,
//       distanceKm: calculateDistanceKm(
//         userLocation.latitude,
//         userLocation.longitude,
//         place.geometry.location.lat,
//         place.geometry.location.lng
//       ),
//     }))
//     .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
// });
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import FuelTabs, { FuelType } from "../../components/fuelTabs";
import StationCard from "../../components/stationCard";
import { fetchNearbyGasStations } from "../../services/googlePlaces";
import { listenToReportsForStation } from "../../services/reportQueries";
import { GooglePlace } from "../../types/GooglePlace";
import { delay } from "../../utils/delay";
import { calculateDistanceKm } from "../../utils/distance";
import { getCurrentLocation } from "../../utils/location";

export default function HomeScreen() {
  const [stations, setStations] = useState<GooglePlace[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [selectedFuel, setSelectedFuel] = useState<FuelType>("petrol");

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const listenersRef = React.useRef<(() => void)[]>([]);

  useEffect(() => {
    loadInitialStations();

    return () => {
      listenersRef.current.forEach((unsub) => unsub());
      listenersRef.current = [];
    };
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

      const withReports = enriched.map((place) => ({
        ...place,
        reports: [],
      }));

      setStations(withReports);

      withReports.forEach((station) => {
        const unsubscribe = listenToReportsForStation(
          station.place_id,
          (reports) => {
            setStations((prev) =>
              prev.map((s) =>
                s.place_id === station.place_id ? { ...s, reports } : s
              )
            );
          }
        );

        listenersRef.current.push(unsubscribe);
      });

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

    const withReports = enriched.map((p) => ({ ...p, reports: [] }));

    setStations((prev) => {
      const map = new Map(prev.map((p) => [p.place_id, p]));
      withReports.forEach((p) => map.set(p.place_id, p));
      return Array.from(map.values()).sort(
        (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0)
      );
    });

    withReports.forEach((station) => {
      const unsubscribe = listenToReportsForStation(
        station.place_id,
        (reports) => {
          setStations((prev) =>
            prev.map((s) =>
              s.place_id === station.place_id ? { ...s, reports } : s
            )
          );
        }
      );
      listenersRef.current.push(unsubscribe);
    });

    setNextPageToken(data.nextPageToken);
    setLoadingMore(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FuelTabs selected={selectedFuel} onChange={setSelectedFuel} />

      <FlatList
        data={stations}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <StationCard station={item} selectedFuel={selectedFuel} />
        )}
        onEndReached={loadMoreStations}
        onEndReachedThreshold={0.6}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

function addDistanceAndSort(
  places: GooglePlace[],
  userLocation: { latitude: number; longitude: number }
) {
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
