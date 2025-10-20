import DropdownComponent from "@/components/dropdown";
import FormInput from "@/components/formInput";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummyState from "../../data/dummystate.json";
import dummyStations from "../../data/dummystations.json";
import fueltypedata from "../../data/fueltypedata.json";

const Submit = () => {
  const [price, setPrice] = useState<string>();
  const [location, setLocation] = useState<string>();

  const handlePriceInput = (price: string) => {
    setPrice(price);
  };
  const handleLocationInput = (location: string) => {
    setLocation(location);
  };

  return (
    <SafeAreaView className="bg-white flex flex-1" edges={[]}>
      <View className="pt-2 flex gap-4 px-4">
        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>Fueling Station </Text>
            <Text className="text-red-500 text-lg mt-1.5">*</Text>
          </View>
          <DropdownComponent dropdownData={dummyStations} />
        </View>
        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>Petroleum Product</Text>
            <Text className="text-red-500 text-lg mt-1">*</Text>
          </View>
          <DropdownComponent dropdownData={fueltypedata} />
        </View>
        <View>
          <View className="flex flex-row gap-2 items-center">
            <Text>State</Text>
            <Text className="text-red-500 text-lg mt-1">*</Text>
          </View>
          <DropdownComponent dropdownData={dummyState} />
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
          onPress={() => {
            console.log(price);
            console.log(location);
          }}
        >
          <Text className="text-center text-white">Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Submit;
