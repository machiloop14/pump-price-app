import DropdownComponent from "@/components/dropdown";
import MultiSelectComponent from "@/components/multiDropdown";
import { useFuelTrends } from "@/hooks/useFuelTrend";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import dateRangeData from "../../data/dateRange.json";
import dummyState from "../../data/dummystate.json";
import dummyStations from "../../data/dummystations.json";
import fueltypedata from "../../data/fueltypedata.json";
// import  {useFuelTrends} from "@/hooks/useFuelTrend"

const colors = ["#138AEC", "#FF5733", "#1FBF54", "#FFB300", "#8E44AD"];

const Trends = () => {
  const [product, setProduct] = useState<string>();
  const [stations, setStations] = useState<string[]>();
  const [stateLoc, setStateLoc] = useState<string>();
  const [dateRange, setDateRange] = useState<number>();
  const [submitted, setSubmitted] = useState(false);

  const handleProductInput = (product: string) => {
    setProduct(product);
  };

  const handleStationInput = (stations: string[]) => {
    setStations(stations);
  };
  const handleStateInput = (stateLoc: string) => {
    setStateLoc(stateLoc);
  };
  const handleDateRangeInput = (dateRange: string) => {
    setDateRange(Number(dateRange));
  };

  const { data, loading } = useFuelTrends(
    product,
    stations,
    stateLoc,
    dateRange,
    submitted
  );

  const lineDataSets = Array(5)
    .fill(undefined)
    .map((_, i) => {
      if (!data[i]) return undefined;
      return data[i].series.map((p: any) => ({
        value: p.price,
        dataPointText: `${p.price}`,
        label: p.date.slice(5),
      }));
    });

  return (
    <SafeAreaView
      className="bg-white flex flex-1 pt-1.5"
      // edges={["top", "left", "right"]}
    >
      <ScrollView>
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
            <MultiSelectComponent
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
                  {product} price trend
                </Text>
                {/* <View className="flex flex-row items-baseline gap-1">
                  <Text className="text-3xl font-bold text-[#0e141b]">
                    avgprice
                  </Text>
                  <Text>(avg)</Text>
                </View> */}
                <Text className="text-[#4e7397]">Last {dateRange} days</Text>
              </View>

              <LineChart
                width={300}
                data={lineDataSets[0]}
                data2={lineDataSets[1]}
                data3={lineDataSets[2]}
                data4={lineDataSets[3]}
                data5={lineDataSets[4]}
                hideRules={true}
                height={280}
                spacing={60}
                initialSpacing={20}
                color1={colors[0]}
                color2={colors[1]}
                color3={colors[2]}
                color4={colors[3]}
                color5={colors[4]}
                isAnimated={true}
                dataPointsHeight={6}
                dataPointsWidth={6}
                dataPointsColor1={colors[0]}
                dataPointsColor2={colors[1]}
                dataPointsColor3={colors[2]}
                dataPointsColor4={colors[3]}
                dataPointsColor5={colors[4]}
                focusEnabled={true}
                showTextOnFocus={true}
              />
            </View>
          )}
        </View>
        <View className="flex flex-row flex-wrap mt-2 mx-auto">
          {stations?.map((st, i) => (
            <View key={i} className="flex flex-row items-center mr-3 mb-1">
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: colors[i],
                  marginRight: 5,
                  borderRadius: 2,
                }}
              />
              <Text>{st}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trends;
