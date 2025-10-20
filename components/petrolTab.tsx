import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import dummydata from "../data/dummydata.json";

import { Station } from "@/types/fuel";

const petrolStations: Station[] = dummydata
  .map((station) => ({
    ...station,
    prices: station.prices.filter(
      (price) => price.fuelType.toLowerCase() === "petrol"
    ),
  }))
  .filter((station) => station.prices.length > 0);

const PetrolTab = () => {
  const [data, setData] = useState<Station[]>([]);

  useEffect(() => {
    setData(petrolStations);
  }, [petrolStations]);

  return (
    <ScrollView
      className="flex flex-1 gap-4 mt-4"
      showsVerticalScrollIndicator={false}
    >
      {data.map((station) => (
        <View
          key={station.stationName}
          className="border-b-[#E0EBF6] border-b py-4"
        >
          <View className="flex flex-row gap-6 items-center">
            <View className="px-2 py-2 bg-[#DAE5F0] rounded-md">
              <MaterialIcons
                name="local-gas-station"
                color="#007CEA"
                size={32}
              />
            </View>
            <View>
              <Text className="font-bold text-xl">{station.stationName}</Text>
              <Text className="text-[#666D71]">{station.location}</Text>
            </View>
          </View>
          <View className="flex mt-1">
            {station.prices.map((report) => (
              <View
                key={report.timeReported}
                className="flex flex-row justify-between items-end py-4"
              >
                <View className="flex">
                  <Text className="text-[#138AEC] font-bold text-2xl">
                    N{report.price}
                  </Text>
                  <Text className="text-[#666D71]">{report.timeReported}</Text>
                </View>
                <View className="flex flex-row gap-3">
                  <View className="flex flex-row items-center gap-1 px-3 py-3 bg-[#DEEFE6] rounded-full">
                    <MaterialIcons
                      name="thumb-up-off-alt"
                      size={18}
                      color="#00BA4C"
                    />
                    <Text className="text-[#00BA4C]">{report.likes}</Text>
                  </View>
                  <View className="flex flex-row items-center gap-1 px-3 py-3 bg-[#F3E2E3] rounded-full">
                    <MaterialIcons
                      name="thumb-down-off-alt"
                      size={18}
                      color="#E74040"
                    />
                    <Text className="text-[#E74040]">{report.dislikes}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PetrolTab;
