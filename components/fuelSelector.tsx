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
          <Text style={[styles.text, value === fuel && styles.activeText]}>
            {FUEL_LABELS[fuel]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 12,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#e9f2ff",
  },
  active: {
    color: "#fff",
    backgroundColor: "#0a66ff",
  },
  text: {
    fontWeight: "500",
    color: "#99a8bc",
    fontSize: 12,
  },
  activeText: {
    color: "#fff",
  },
});
