import React from "react";
import { ScrollView, Text } from "react-native";

import { useFuelReports } from "@/hooks/useFuelReport";
import PriceReport from "./priceReport";

const KeroseneTab = () => {
  const { reports, loading } = useFuelReports("kerosene");

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

export default KeroseneTab;
