import DropdownComponent from "@/components/dropdown";
import FormInput from "@/components/formInput";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummyState from "../../data/dummystate.json";
import dummyStations from "../../data/dummystations.json";
import fueltypedata from "../../data/fueltypedata.json";

import { useAuth } from "@/context/auth";
import { useAppToast } from "@/hooks/useAppToast";
import { submitFuelReport } from "../../services/submitFuelReport";

const Submit = () => {
  const toast = useAppToast();
  const { user } = useAuth();

  const [price, setPrice] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [station, setStation] = useState<string>();
  const [product, setProduct] = useState<string>();
  const [state, setState] = useState<string>();

  const handlePriceInput = (price: string) => {
    setPrice(price);
  };
  const handleLocationInput = (location: string) => {
    setLocation(location);
  };
  const handleStationInput = (station: string) => {
    setStation(station);
  };
  const handleProductInput = (product: string) => {
    setProduct(product);
  };
  const handleStateInput = (state: string) => {
    setState(state);
  };

  const handleSubmit = async () => {
    if (!station || !product || !state || !price || !location) {
      console.log("Missing fields");
      toast.error("Missing Required Fields");

      return;
    }

    try {
      await submitFuelReport(
        station,
        state,
        product,
        Number(price),
        user?.email || "Anonymous",
        location
      );

      toast.success("Report Submitted!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit report");
    }
  };

  return (
    <SafeAreaView className="bg-white flex flex-1" edges={[]}>
      <View className="pt-2 flex gap-4 px-4">
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
            <Text>Petroleum Product</Text>
            <Text className="text-red-500 text-lg mt-1">*</Text>
          </View>
          <DropdownComponent
            dropdownData={fueltypedata}
            handleDropdownInput={handleProductInput}
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
        <View className="mb-2">
          <View className="flex flex-row gap-2 items-center">
            <Text>Price</Text>
            <Text className="text-red-500 text-lg mt-1">*</Text>
          </View>
          <FormInput
            formClass="bg-white rounded-md border border-gray-400 py-4 px-2"
            placeholder="N0.00"
            keyboard="decimal-pad"
            handleFormInput={handlePriceInput}
          />
        </View>
        <View className="mb-2">
          <Text>Location</Text>
          <FormInput
            formClass="bg-white rounded-md border border-gray-400 py-4 px-2"
            placeholder="agbowo, opp UI gate"
            keyboard="default"
            handleFormInput={handleLocationInput}
          />
        </View>
        <Pressable
          className="bg-[#138AEC] py-4 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white">Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Submit;
