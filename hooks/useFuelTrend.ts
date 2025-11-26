import { db } from "@/firebaseConfig";
import { FuelPrice, StationData } from "@/types/fuel";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFuelTrends = (
  fuelType: string | undefined,
  stationName: string | undefined,
  stateLoc: string | undefined,
  days: number | undefined,
  trigger: boolean
) => {
  const [data, setData] = useState<{ date: string; price: number }[]>([]);
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!trigger || !fuelType || !stationName || !stateLoc || !days) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "stations"));
        let result: FuelPrice[] = [];

        snapshot.forEach((doc) => {
          const station = doc.data() as StationData;

          if (station.stationName !== stationName) return;

          const validPrices = station.prices.filter(
            (p) =>
              p.fuelType.toLowerCase() === fuelType.toLowerCase() &&
              p.state.toLowerCase() === stateLoc.toLowerCase() &&
              dayjs(p.timeReported).isAfter(dayjs().subtract(days, "day"))
          );

          result = [...result, ...validPrices];
        });

        // Group by date → daily average
        const grouped: Record<string, number[]> = {};

        result.forEach((p) => {
          const date = dayjs(p.timeReported).format("YYYY-MM-DD");
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(p.price);
        });

        const aggregated = Object.entries(grouped).map(([date, prices]) => ({
          date,
          price: prices.reduce((a, b) => a + b, 0) / prices.length,
        }));

        aggregated.sort((a, b) => (a.date > b.date ? 1 : -1));

        // average of all points
        if (aggregated.length > 0) {
          const avg =
            aggregated.reduce((sum, p) => sum + p.price, 0) / aggregated.length;
          setAvgPrice(Number(avg.toFixed(2)));
        } else {
          setAvgPrice(null);
        }

        setData(aggregated);
      } catch (e) {
        console.log("Error fetching trend data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fuelType, stationName, stateLoc, days, trigger]);

  return { data, avgPrice, loading };
};
