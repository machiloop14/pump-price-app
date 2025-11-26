import DropdownComponent from "@/components/dropdown";
import { useFuelTrends } from "@/hooks/useFuelTrend";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import dateRangeData from "../../data/dateRange.json";
import dummyState from "../../data/dummystate.json";
import dummyStations from "../../data/dummystations.json";
import fueltypedata from "../../data/fueltypedata.json";
// import  {useFuelTrends} from "@/hooks/useFuelTrend"

const Trends = () => {
  const [product, setProduct] = useState<string>();
  const [station, setStation] = useState<string>();
  const [stateLoc, setStateLoc] = useState<string>();
  const [dateRange, setDateRange] = useState<number>();
  const [submitted, setSubmitted] = useState(false);

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
    setDateRange(Number(dateRange));
  };

  const { data, avgPrice, loading } = useFuelTrends(
    product,
    station,
    stateLoc,
    dateRange,
    submitted
  );

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
          onPress={() => setSubmitted((prev) => !prev)}
        >
          <Text className="text-center text-white">Display/Hide Chart</Text>
        </Pressable>
      </View>

      <View className="px-4 mt-10">
        {!submitted ? (
          <Text className="text-center text-gray-500">
            Select filters & press submit to view trends.
          </Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#138AEC" />
        ) : data.length === 0 ? (
          <Text className="text-center text-gray-500">
            No price reports found for this selection.
          </Text>
        ) : (
          <View>
            <View className="flex gap-2 mb-2">
              <Text className="text-xl text-[#0e141b]">
                {product} Price Trend
              </Text>
              <View className="flex flex-row items-baseline gap-1">
                <Text className="text-3xl font-bold text-[#0e141b]">
                  N{avgPrice}
                </Text>
                <Text>(avg)</Text>
              </View>
              <Text className="text-[#4e7397]">
                Last {dateRange} days — {station}
              </Text>
            </View>

            <LineChart
              data={data.map((d) => ({
                value: d.price,
                label: d.date.slice(5),
              }))}
              width={350}
              height={220}
              curved
              thickness={3}
              spacing={40}
              initialSpacing={20}
              color="#138AEC"
              yAxisTextStyle={{ color: "#4e7397" }}
              xAxisLabelTextStyle={{ color: "#4e7397" }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Trends;
