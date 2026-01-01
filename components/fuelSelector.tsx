import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FUEL_LABELS, FuelType } from "../types/fuels";

interface Props {
  value: FuelType | null;
  onChange: (fuel: FuelType) => void;
}

export default function FuelSelector({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {(Object.keys(FUEL_LABELS) as FuelType[]).map((fuel) => (
        <TouchableOpacity
          key={fuel}
          style={[styles.button, value === fuel && styles.active]}
          onPress={() => onChange(fuel)}
        >
          <Text style={styles.text}>{FUEL_LABELS[fuel]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 12,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  active: {
    backgroundColor: "#dbeafe",
    borderColor: "#3b82f6",
  },
  text: {
    fontWeight: "500",
  },
});
