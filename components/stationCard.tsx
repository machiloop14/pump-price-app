import { useAuth } from "@/context/auth";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toggleDislike, toggleLike } from "../services/reportVotes";
import { GooglePlace, Report } from "../types/GooglePlace";
import { timeAgo } from "../utils/time";
import { FuelType } from "./fuelTabs";

interface Props {
  station: GooglePlace;
  selectedFuel: FuelType;
}

export default function StationCard({ station, selectedFuel }: Props) {
  const { user } = useAuth();
  const userId = user?.uid;

  // const filteredReports =
  //   station.reports?.filter((r) => r.fuelType === selectedFuel) ?? [];

  const filteredReports =
    station.reports?.filter(
      (r) => r.fuelType === selectedFuel && r.trustStatus === "valid"
    ) ?? [];

  const handleLike = (report: Report) => {
    if (!userId) return;
    toggleLike(station.place_id, report.id, userId).catch(console.error);
  };

  const handleDislike = (report: Report) => {
    if (!userId) return;
    toggleDislike(station.place_id, report.id, userId).catch(console.error);
  };

  return (
    <View className="px-3 mb-3 rounded-lg bg-white">
      {/* top */}
      <View className="flex  flex-row  py-4 border-b border-gray-200 items-start justify-between ">
        <View className="flex  flex-row gap-2 w-[70%] items-center ">
          <View className="px-2 py-2 bg-[#DAE5F0] rounded-full">
            <MaterialIcons name="local-gas-station" color="#007CEA" size={24} />
          </View>
          <View className="flex flex-1 gap-1 ">
            <Text className="font-bold text-base">{station.name}</Text>
            {/* <View className="text-wrap "> */}
            {/* {station.distanceKm !== undefined && (
                <Text className="text-xs text-gray-500">
                  {station.distanceKm.toFixed(2)} km
                </Text>
              )} */}
            {station.vicinity && (
              <Text className="text-xs text-gray-500 text-wrap">
                {station.vicinity}
              </Text>
            )}
            {/* </View> */}
          </View>
        </View>
        <View>
          {station.distanceKm !== undefined && (
            <Text className="text-md text-gray-500 font-bold">
              {station.distanceKm.toFixed(2)} km
            </Text>
          )}
        </View>
      </View>

      {/* {station.rating && <Text>⭐ {station.rating}</Text>}
      {station.opening_hours && (
        <Text>{station.opening_hours.open_now ? "Open now" : "Closed"}</Text>
      )}
      {station.distanceKm !== undefined && (
        <Text>{station.distanceKm.toFixed(2)} km away</Text>
      )} */}

      {filteredReports.length > 0 ? (
        <View className="pt-2 pb-4">
          {filteredReports.map((report) => (
            <View
              key={report.id}
              style={{ marginBottom: 8 }}
              className="flex flex-row items-center justify-between"
            >
              <View>
                <Text style={{ fontWeight: "600" }}>₦{report.price}</Text>
                {/* Time ago */}
                <Text style={styles.time}>
                  Reported {timeAgo(report.submittedAt)}
                </Text>
              </View>

              <View className="flex flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleLike(report)}
                  className="flex flex-row items-center gap-1 px-2 py-1 bg-[#DEEFE6] rounded-full"
                >
                  <MaterialIcons
                    name={
                      report.likes.includes(userId ?? "")
                        ? "thumb-up-alt"
                        : "thumb-up-off-alt"
                    }
                    size={14}
                    color="#00BA4C"
                  />
                  <Text className="text-[#00BA4C] text-sm">
                    {report.likes.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDislike(report)}
                  className="flex flex-row items-center gap-1 px-2 py-1 bg-[#F3E2E3] rounded-full"
                >
                  <MaterialIcons
                    name={
                      report.dislikes.includes(userId ?? "")
                        ? "thumb-down-alt"
                        : "thumb-down-off-alt"
                    }
                    size={14}
                    color="#E74040"
                  />
                  <Text className="text-[#E74040] text-sm">
                    {report.dislikes.length}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text className="pt-4 pb-6 text-gray-500">No prices reported</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
});
