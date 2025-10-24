import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dummyStates from "../data/dummystate.json";
import dummyStations from "../data/dummystations.json";
import DropdownComponent from "./dropdown";
import FormInput from "./formInput";

interface filterModalProps {
  handleStationInput: (a: string) => void;
  handleStateInput: (a: string) => void;
  handleMinPriceInput: (a: string) => void;
  handleMaxPriceInput: (a: string) => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filteredStation: string | undefined;
}

const FilterModal = ({
  handleStationInput,
  handleStateInput,
  handleMinPriceInput,
  handleMaxPriceInput,
  modalVisible,
  setModalVisible,
  filteredStation,
}: filterModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      statusBarTranslucent={true}
      presentationStyle="fullScreen"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView className="flex-1 bg-white px-4 pt-4">
        <View className="flex flex-row justify-between items-center pb-4 border-b border-gray-100">
          <View className="flex flex-row items-center gap-4 ">
            <MaterialIcons
              name="clear"
              size={32}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text className="font-bold text-black text-2xl">
              Search filters
            </Text>
          </View>
          <Pressable
            className="bg-black rounded-full"
            onPress={() => {
              console.log(filteredStation);
              setModalVisible(!modalVisible);
            }}
          >
            <Text className="text-white px-6 py-2 font-medium text-xl">
              Apply
            </Text>
          </Pressable>
        </View>
        <View className="flex gap-6 mt-6">
          <View>
            <Text>Fueling Station</Text>
            <DropdownComponent
              dropdownData={dummyStations}
              handleDropdownInput={handleStationInput}
            />
          </View>
          <View>
            <Text>State</Text>
            <DropdownComponent
              dropdownData={dummyStates}
              handleDropdownInput={handleStateInput}
            />
          </View>
          <View>
            <Text>Min Price</Text>
            <FormInput
              formClass="bg-white rounded-md border border-gray-400 py-4 px-2"
              placeholder="N0.00"
              keyboard="decimal-pad"
              handleFormInput={handleMinPriceInput}
            />
          </View>
          <View>
            <Text>Max Price</Text>
            <FormInput
              formClass="bg-white rounded-md border border-gray-400 py-4 px-2"
              placeholder="N0.00"
              keyboard="decimal-pad"
              handleFormInput={handleMaxPriceInput}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;
