import { useFuelReports } from "@/hooks/useFuelReport";
import React from "react";
import { ScrollView, Text } from "react-native";
import PriceReport from "./priceReport";

const PetrolTab = () => {
  const { reports, loading } = useFuelReports("petrol");

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView
      className="flex flex-1 gap-4 mt-4"
      showsVerticalScrollIndicator={false}
    >
      <PriceReport priceReport={reports} />
    </ScrollView>
  );
};

export default PetrolTab;
