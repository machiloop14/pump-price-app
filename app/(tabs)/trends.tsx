import DropdownComponent from "@/components/dropdown";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dateRangeData from "../../data/dateRange.json";
import dummyState from "../../data/dummystate.json";
import dummyStations from "../../data/dummystations.json";
import fueltypedata from "../../data/fueltypedata.json";

const Trends = () => {
  const [product, setProduct] = useState<string>();
  const [station, setStation] = useState<string>();
  const [stateLoc, setStateLoc] = useState<string>();
  const [dateRange, setDateRange] = useState<string>();

  const handleProductInput = (product: string) => {
    setProduct(product);
  };

  const handleStationInput = (station: string) => {
    setStation(station);
  };
  const handleStateInput = (stateLoc: string) => {
    setStateLoc(stateLoc);
  };
  const handleDateRangeInput = (dateRange: string) => {
    setDateRange(dateRange);
  };

  return (
    <SafeAreaView
      className="bg-white flex flex-1 pt-1.5"
      // edges={["top", "left", "right"]}
    >
      <View className="pt-2 flex gap-1.5 px-4">
        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>Fuel Type</Text>
            <Text className="text-red-500 text-lg mt-1.5">*</Text>
          </View>
          <DropdownComponent
            dropdownData={fueltypedata}
            handleDropdownInput={handleProductInput}
          />
        </View>
        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>Fueling Station </Text>
            <Text className="text-red-500 text-lg mt-1.5">*</Text>
          </View>
          <DropdownComponent
            dropdownData={dummyStations}
            handleDropdownInput={handleStationInput}
          />
        </View>

        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>State</Text>
            <Text className="text-red-500 text-lg mt-1">*</Text>
          </View>
          <DropdownComponent
            dropdownData={dummyState}
            handleDropdownInput={handleStateInput}
          />
        </View>
        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>Date Range</Text>
            <Text className="text-red-500 text-lg mt-1">*</Text>
          </View>
          <DropdownComponent
            dropdownData={dateRangeData}
            handleDropdownInput={handleDateRangeInput}
          />
        </View>
        <Pressable
          className="bg-[#138AEC] py-4 rounded-lg"
          onPress={() => {
            console.log(product);
            console.log(station);
            console.log(stateLoc);
            console.log(dateRange);
          }}
        >
          <Text className="text-center text-white">Submit</Text>
        </Pressable>
      </View>
      <View className="px-4 mt-10">
        <View className="flex gap-2 mb-2">
          <Text className=" text-xl text-[#0e141b]">Petrol Price Trend</Text>
          <View className="flex flex-row gap-1 items-baseline">
            <Text className="text-3xl font-bold text-[#0e141b">N945.50</Text>
            <Text>(avg)</Text>
          </View>
          <Text className="text-[#4e7397]">Last 30 days</Text>
        </View>
        <View className="h-52">
          <Image
            source={require("../../assets/images/graph.png")}
            className="w-full h-full"
            resizeMode="stretch"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Trends;
