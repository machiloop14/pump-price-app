// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { GooglePlace } from "../types/GooglePlace";

// interface Props {
//   station: GooglePlace;
// }

// export default function StationCard({ station }: Props) {
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

//       {/* Reports */}
//       {station.reports && station.reports.length > 0 ? (
//         <View style={{ marginTop: 8 }}>
//           {station.reports.map((report) => (
//             <Text key={report.id}>
//               {report.fuelType.toUpperCase()} — ₦{report.price} (
//               {report.likes.length}👍 {report.dislikes.length}👎)
//             </Text>
//           ))}
//         </View>
//       ) : (
//         <Text style={{ marginTop: 8, color: "#666" }}>No reports yet</Text>
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

interface Props {
  station: GooglePlace;
}

export default function StationCard({ station }: Props) {
  const { user } = useAuth();
  const userId = user?.uid;
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

      {/* Reports */}
      {station.reports && station.reports.length > 0 ? (
        <View style={{ marginTop: 8 }}>
          {station.reports.map((report) => (
            <View key={report.id} style={{ marginBottom: 6 }}>
              <Text>
                {report.fuelType.toUpperCase()} — ₦{report.price}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <TouchableOpacity
                  onPress={() => handleLike(report)}
                  style={{ marginRight: 12 }}
                >
                  <Text
                    style={{
                      color: report.likes.includes(userId!) ? "green" : "gray",
                    }}
                  >
                    👍 {report.likes.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDislike(report)}>
                  <Text
                    style={{
                      color: report.dislikes.includes(userId!) ? "red" : "gray",
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
        <Text style={{ marginTop: 8, color: "#666" }}>No reports yet</Text>
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
