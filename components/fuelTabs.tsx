import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FuelType = "petrol" | "diesel" | "kerosene";

interface Props {
  selected: FuelType;
  onChange: (fuel: FuelType) => void;
}

const fuels: FuelType[] = ["petrol", "diesel", "kerosene"];

export default function FuelTabs({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      {fuels.map((fuel) => (
        <TouchableOpacity
          key={fuel}
          onPress={() => onChange(fuel)}
          style={[styles.tab, selected === fuel && styles.activeTab]}
        >
          <Text style={[styles.text, selected === fuel && styles.activeText]}>
            {fuel.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#222",
  },
  text: {
    fontWeight: "600",
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
});
