import { fetchAllReports } from "@/services/fetchFuelReports";
import { StationData } from "@/types/fuel";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PriceReport from "./priceReport";

// const petrolStations: Station[] = dummydata
//   .map((station) => ({
//     ...station,
//     prices: station.prices.filter(
//       (price) => price.fuelType.toLowerCase() === "petrol"
//     ),
//   }))
//   .filter((station) => station.prices.length > 0);

const PetrolTab = () => {
  const [reports, setReports] = useState<StationData[]>([]);

  useEffect(() => {
    const loadStations = async () => {
      const data = await fetchAllReports();

      const petrolData: StationData[] = data
        .map((station) => ({
          ...station,
          prices: station.prices.filter(
            (price) => price.fuelType.toLowerCase() === "petrol"
          ),
        }))
        .filter((station) => station.prices.length > 0);
      setReports(petrolData);
    };

    loadStations();
  }, []);

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
