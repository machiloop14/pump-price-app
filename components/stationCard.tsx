// import { useAuth } from "@/context/auth";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { toggleDislike, toggleLike } from "../services/reportVotes";
// import { GooglePlace, Report } from "../types/GooglePlace";
// import { FuelType } from "./fuelTabs";

// interface Props {
//   station: GooglePlace;
//   selectedFuel: FuelType;
// }

// export default function StationCard({ station, selectedFuel }: Props) {
//   const { user } = useAuth();
//   const userId = user?.uid;

//   const filteredReports =
//     station.reports?.filter((r) => r.fuelType === selectedFuel) ?? [];

//   const handleLike = (report: Report) => {
//     if (!userId) return;
//     toggleLike(station.place_id, report.id, userId).catch(console.error);
//   };

//   const handleDislike = (report: Report) => {
//     if (!userId) return;
//     toggleDislike(station.place_id, report.id, userId).catch(console.error);
//   };

//   return (
//     <View style={styles.card}>
//       <Text style={styles.name}>{station.name}</Text>
//       {station.vicinity && <Text>{station.vicinity}</Text>}
//       {station.rating && <Text>⭐ {station.rating}</Text>}
//       {station.opening_hours && (
//         <Text>{station.opening_hours.open_now ? "Open now" : "Closed"}</Text>
//       )}
//       {station.distanceKm !== undefined && (
//         <Text>{station.distanceKm.toFixed(2)} km away</Text>
//       )}

//       {filteredReports.length > 0 ? (
//         <View style={{ marginTop: 8 }}>
//           {filteredReports.map((report) => (
//             <View key={report.id} style={{ marginBottom: 6 }}>
//               <Text>₦{report.price}</Text>

//               <View style={{ flexDirection: "row", marginTop: 4 }}>
//                 <TouchableOpacity
//                   onPress={() => handleLike(report)}
//                   style={{ marginRight: 12 }}
//                 >
//                   <Text
//                     style={{
//                       color: report.likes.includes(userId ?? "")
//                         ? "green"
//                         : "gray",
//                     }}
//                   >
//                     👍 {report.likes.length}
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => handleDislike(report)}>
//                   <Text
//                     style={{
//                       color: report.dislikes.includes(userId ?? "")
//                         ? "red"
//                         : "gray",
//                     }}
//                   >
//                     👎 {report.dislikes.length}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </View>
//       ) : (
//         <Text style={{ marginTop: 8, color: "#777" }}>
//           No {selectedFuel} prices reported
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 14,
//     marginBottom: 10,
//     borderRadius: 8,
//     backgroundColor: "#eee",
//   },
//   name: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });
import { useAuth } from "@/context/auth";
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

  const filteredReports =
    station.reports?.filter((r) => r.fuelType === selectedFuel) ?? [];

  const handleLike = (report: Report) => {
    if (!userId) return;
    toggleLike(station.place_id, report.id, userId).catch(console.error);
  };

  const handleDislike = (report: Report) => {
    if (!userId) return;
    toggleDislike(station.place_id, report.id, userId).catch(console.error);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{station.name}</Text>
      {station.vicinity && <Text>{station.vicinity}</Text>}
      {station.rating && <Text>⭐ {station.rating}</Text>}
      {station.opening_hours && (
        <Text>{station.opening_hours.open_now ? "Open now" : "Closed"}</Text>
      )}
      {station.distanceKm !== undefined && (
        <Text>{station.distanceKm.toFixed(2)} km away</Text>
      )}

      {filteredReports.length > 0 ? (
        <View style={{ marginTop: 8 }}>
          {filteredReports.map((report) => (
            <View key={report.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "600" }}>₦{report.price}</Text>

              {/* Time ago */}
              <Text style={styles.time}>
                reported {timeAgo(report.submittedAt)}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <TouchableOpacity
                  onPress={() => handleLike(report)}
                  style={{ marginRight: 12 }}
                >
                  <Text
                    style={{
                      color: report.likes.includes(userId ?? "")
                        ? "green"
                        : "gray",
                    }}
                  >
                    👍 {report.likes.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDislike(report)}>
                  <Text
                    style={{
                      color: report.dislikes.includes(userId ?? "")
                        ? "red"
                        : "gray",
                    }}
                  >
                    👎 {report.dislikes.length}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ marginTop: 8, color: "#777" }}>
          No {selectedFuel} prices reported
        </Text>
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
  time: {
    fontSize: 12,
    color: "#666",
  },
});
