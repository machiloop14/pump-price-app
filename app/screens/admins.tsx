import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/context/auth";
import { approveReport, rejectReport } from "../../services/adminReportActions";
import {
  FlaggedReport,
  listenToFlaggedReports,
} from "../../services/adminReportQueries";

export default function FlaggedReportsScreen() {
  const [reports, setReports] = useState<FlaggedReport[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = listenToFlaggedReports(setReports);
    return unsub;
  }, []);

  const handleApprove = (report: FlaggedReport) => {
    if (!user) return;
    approveReport(report.stationId, report.id, user.uid);
  };

  const handleReject = (report: FlaggedReport) => {
    if (!user) return;
    rejectReport(report.stationId, report.id, user.uid);
  };

  console.log(reports);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flagged Reports</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.station}>{item.stationAddress}</Text>
              <Text
                style={[
                  styles.badge,
                  item.trustStatus === "suspicious"
                    ? styles.suspicious
                    : styles.rejected,
                ]}
              >
                {item.trustStatus.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.price}>
              {item.fuelType.toUpperCase()} — ₦{item.price}/L
            </Text>

            <Text style={styles.meta}>
              Reported by: {item.userId.substring(0, 8)}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.rejectBtn]}
                onPress={() => handleReject(item)}
              >
                <Text style={styles.btnText}>✕ Reject</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.approveBtn]}
                onPress={() => handleApprove(item)}
              >
                <Text style={styles.btnText}>✓ Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7fbff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  station: {
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  suspicious: {
    backgroundColor: "#fff3cd",
    color: "#856404",
  },
  rejected: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    marginTop: 6,
    color: "#666",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 10,
  },
  approveBtn: {
    backgroundColor: "#e6f4ea",
  },
  rejectBtn: {
    backgroundColor: "#fdecea",
  },
  btnText: {
    fontWeight: "600",
  },
});
