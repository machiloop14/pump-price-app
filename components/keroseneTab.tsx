import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import dummydata from "../data/dummydata.json";

import { Station } from "@/types/fuel";
import PriceReport from "./priceReport";

const keroseneStations: Station[] = dummydata
  .map((station) => ({
    ...station,
    prices: station.prices.filter(
      (price) => price.fuelType.toLowerCase() === "kerosene"
    ),
  }))
  .filter((station) => station.prices.length > 0);

const KeroseneTab = () => {
  const [data, setData] = useState<Station[]>([]);

  useEffect(() => {
    setData(keroseneStations);
  }, [keroseneStations]);

  return (
    <ScrollView
      className="flex flex-1 gap-4 mt-4"
      showsVerticalScrollIndicator={false}
    >
      <PriceReport priceReport={data} />
    </ScrollView>
  );
};

export default KeroseneTab;
