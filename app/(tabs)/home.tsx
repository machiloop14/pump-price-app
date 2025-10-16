import DieselTab from "@/components/dieselTab";
import KeroseneTab from "@/components/keroseneTab";
import PetrolTab from "@/components/petrolTab";
import React from "react";
import { useWindowDimensions, View } from "react-native";
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
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
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
    </SafeAreaView>
  );
};

export default Home;
