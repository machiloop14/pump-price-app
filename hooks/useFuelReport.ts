import { listenToStations } from "@/services/fetchFuelReports";
import { StationData } from "@/types/fuel";
import { useEffect, useState } from "react";

export const useFuelReports = (fuelType?: string) => {
  const [reports, setReports] = useState<StationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToStations((data) => {
      let formattedData: StationData[] = data;

      // ✅ Filter by fuel type if provided
      if (fuelType) {
        formattedData = data
          .map((station) => ({
            ...station,
            prices: station.prices.filter(
              (price) => price.fuelType.toLowerCase() === fuelType.toLowerCase()
            ),
          }))
          .filter((station) => station.prices.length > 0);
      }

      setReports(formattedData);
      setLoading(false);
    });

    return unsubscribe;
  }, [fuelType]);

  return { reports, loading };
};
