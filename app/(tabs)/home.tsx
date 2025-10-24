import DieselTab from "@/components/dieselTab";
import FilterModal from "@/components/filterModal";
import KeroseneTab from "@/components/keroseneTab";
import PetrolTab from "@/components/petrolTab";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const renderScene = SceneMap({
  petrol: PetrolTab,
  kerosene: KeroseneTab,
  diesel: DieselTab,
});

const routes = [
  {
    key: "petrol",
    title: "Petrol",
  },
  {
    key: "kerosene",
    title: "Kerosene",
  },
  {
    key: "diesel",
    title: "Diesel",
  },
];

const Home = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filteredState, setFilteredState] = useState<string>();
  const [filteredStation, setFilteredStation] = useState<string>();
  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();

  const handleStateInput = (state: string) => {
    setFilteredState(state);
  };

  const handleStationInput = (station: string) => {
    setFilteredStation(station);
  };

  const handleMinPriceInput = (price: string) => {
    setMinPrice(price);
  };

  const handleMaxPriceInput = (price: string) => {
    setMaxPrice(price);
  };

  return (
    <SafeAreaView
      className="flex-1 px-4 bg-white pb-2"
      edges={["top", "left", "right"]}
    >
      {/* HEADER & FILTER BTN */}
      <View className="relative mt-4 mb-6">
        <Text className="text-center font-bold text-2xl ">Fuel Finder</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          className="absolute right-0 -top-2 px-2 py-2 bg-[#DAE5F0] rounded-full"
        >
          <MaterialIcons name="tune" size={28} color="#007CEA" />
        </Pressable>
      </View>
      {/*  MAP COMPONENT */}
      <View className="h-60   my-2">
        <Image
          source={require("../../assets/images/map.png")}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </View>
      {/* TAB COMPONENT */}
      <View className="flex flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#007CEA" }}
              style={{
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 3,
                borderBottomColor: "#CDE3F6",
              }}
              activeColor="#0082EC"
              inactiveColor="black"
            />
          )}
        />
      </View>
      {/* MODAL COMPONENT */}
      <FilterModal
        handleMaxPriceInput={handleMaxPriceInput}
        handleMinPriceInput={handleMinPriceInput}
        handleStateInput={handleStateInput}
        handleStationInput={handleStationInput}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        filteredStation={filteredStation}
      />
    </SafeAreaView>
  );
};

export default Home;
