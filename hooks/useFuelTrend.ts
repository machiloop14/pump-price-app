import { db } from "@/firebaseConfig";
import { StationData } from "@/types/fuel";
import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFuelTrends = (
  fuelType: string | undefined,
  stations: string[] | undefined,
  stateLoc: string | undefined,
  days: number | undefined,
  trigger: boolean
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!trigger || !fuelType || !stateLoc || !days || stations?.length === 0)
      return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const snapshot = await getDocs(collection(db, "stations"));
        const output: any[] = [];

        stations?.forEach((name) => {
          const stationDoc = snapshot.docs.find(
            (doc) => (doc.data() as StationData).stationName === name
          );
          if (!stationDoc) return;

          const station = stationDoc.data() as StationData;

          const filtered = station.prices.filter(
            (p) =>
              p.fuelType.toLowerCase() === fuelType.toLowerCase() &&
              p.state.toLowerCase() === stateLoc.toLowerCase() &&
              dayjs(p.timeReported).isAfter(dayjs().subtract(days, "day"))
          );

          const grouped: Record<string, number[]> = {};

          filtered.forEach((p) => {
            const date = dayjs(p.timeReported).format("YYYY-MM-DD");
            grouped[date] = grouped[date] || [];
            grouped[date].push(p.price);
          });

          const aggregated = Object.entries(grouped).map(([date, prices]) => ({
            date,
            price: prices.reduce((a, b) => a + b) / prices.length,
          }));

          aggregated.sort((a, b) => (a.date > b.date ? 1 : -1));

          output.push({
            stationName: name,
            series: aggregated,
          });
        });

        setData(output);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fuelType, stations, stateLoc, days, trigger]);

  return { data, loading };
};
