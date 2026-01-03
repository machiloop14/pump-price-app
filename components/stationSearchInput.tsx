import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchStations } from "../services/placesSearch";
import { StationSearchResult } from "../types/stationSearchResult";

interface Props {
  onSelect: (station: StationSearchResult) => void;
}

export default function StationSearchInput({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      const data = await searchStations(query);
      setResults(data);
      setLoading(false);
    }, 400); // debounce typing

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <View>
      <View className="flex flex-row items-center bg-white py-1 rounded-full px-2">
        <MaterialIcons name="location-pin" color="green" size={30} />
        <TextInput
          placeholder="Search gas station..."
          value={query}
          onChangeText={setQuery}
          className="flex flex-1"
        />
        <Pressable onPress={() => setQuery("")}>
          <MaterialIcons name="clear" size={20} color="black" />
        </Pressable>
      </View>

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          className="bg-white mt-0"
          contentContainerStyle={{ gap: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                setQuery(item.name);
                setResults([]);
                setQuery(""); // DEBUG: possible error
              }}
            >
              <View className="flex flex-row items-center gap-2">
                <MaterialIcons name="location-pin" size={32} color="gray" />
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.address}>{item.formatted_address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
  address: {
    color: "#666",
    fontSize: 12,
  },
});
