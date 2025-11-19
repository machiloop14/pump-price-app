import { useAuth } from "@/context/auth";
import { timeAgo } from "@/functions/timeAgo";
import { toggleDislike } from "@/services/toggleDislike";
import { toggleLike } from "@/services/toggleLike";
import { StationData } from "@/types/fuel";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface PriceReportProps {
  priceReport: StationData[];
}

const PriceReport = ({ priceReport }: PriceReportProps) => {
  const { user } = useAuth();

  const onLikePress = (stationName: string, priceId: string) => {
    if (!user) return; // exit if user is null
    toggleLike(stationName, priceId, user.uid);
  };

  const onDislikePress = (stationName: string, priceId: string) => {
    if (!user) return; // exit if user is null

    toggleDislike(stationName, priceId, user.uid);
  };

  return (
    <View>
      {priceReport.map((station) => (
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
              <Text className="font-bold text-xl">
                {station.stationName.toUpperCase()}
              </Text>
              {/* <Text className="text-[#666D71]">{station.location}</Text> */}
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
                  <Text className="text-[#666D71]">
                    {timeAgo(report.timeReported)}
                  </Text>
                  <Text className="text-[#666D71]">
                    {report.location + ", " + report.state}
                  </Text>
                </View>
                {user && (
                  <View className="flex flex-row gap-3">
                    <Pressable
                      className="flex flex-row items-center gap-1 px-3 py-3 bg-[#DEEFE6] rounded-full"
                      onPress={() =>
                        onLikePress(station.stationName, report.id)
                      }
                    >
                      <MaterialIcons
                        name="thumb-up-off-alt"
                        size={18}
                        color="#00BA4C"
                      />
                      <Text className="text-[#00BA4C]">
                        {report.likes.length}
                      </Text>
                    </Pressable>
                    <Pressable
                      className="flex flex-row items-center gap-1 px-3 py-3 bg-[#F3E2E3] rounded-full"
                      onPress={() =>
                        onDislikePress(station.stationName, report.id)
                      }
                    >
                      <MaterialIcons
                        name="thumb-down-off-alt"
                        size={18}
                        color="#E74040"
                      />
                      <Text className="text-[#E74040]">
                        {report.dislikes.length}
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default PriceReport;
