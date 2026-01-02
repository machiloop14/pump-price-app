import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

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
  const [showOnlyWithReports, setShowOnlyWithReports] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const listenersRef = useRef<(() => void)[]>([]);

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
    await delay(1500);

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

  /**
   * FILTERED STATIONS
   */
  // const filteredStations = useMemo(() => {
  //   if (!showOnlyWithReports) return stations;

  //   return stations.filter(
  //     (s) => Array.isArray(s.reports) && s.reports.length > 0
  //   );
  // }, [stations, showOnlyWithReports]);
  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      if (!showOnlyWithReports) return true;

      return station.reports?.some((r) => r.fuelType === selectedFuel) ?? false;
    });
  }, [stations, showOnlyWithReports, selectedFuel]);

  return (
    <View style={styles.container}>
      <View className="h-44 mb-2">
        <Image
          source={require("../../assets/images/map.png")}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </View>
      {/* Fuel Tabs */}
      <FuelTabs selected={selectedFuel} onChange={setSelectedFuel} />

      {/* Filter Toggle */}
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>Show only stations with prices</Text>
        <Switch
          value={showOnlyWithReports}
          onValueChange={setShowOnlyWithReports}
        />
      </View>

      {loading && <ActivityIndicator size="large" style={{ flex: 1 }} />}

      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <StationCard station={item} selectedFuel={selectedFuel} />
        )}
        onEndReached={loadMoreStations}
        onEndReachedThreshold={0.6}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
      <StatusBar backgroundColor="black" />
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
    backgroundColor: "#f7fafc",
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
