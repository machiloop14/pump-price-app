import { db } from "@/firebaseConfig";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

type TrendPoint = {
  date: string;
  price: number;
};

type TrendSeries = {
  stationName: string; // brand (nnpc, oando, etc.)
  series: TrendPoint[];
};

export const useFuelTrends = (
  fuelType: string | undefined,
  stations: string[] | undefined, // ["nnpc", "oando"]
  stateLoc: string | undefined,
  days: number | undefined,
  trigger: boolean
) => {
  const [data, setData] = useState<TrendSeries[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !trigger ||
      !fuelType ||
      !stateLoc ||
      !days ||
      !stations ||
      stations.length === 0
    ) {
      console.log("Incomplete data");
      return;
    }

    console.log(fuelType, stateLoc, days, stations, stations.length);

    const fetchTrends = async () => {
      setLoading(true);

      try {
        // 1️⃣ Fetch all stations in the selected state
        const stationsRef = collection(db, "stationss");
        const stationsQuery = query(
          stationsRef,
          where("state", "==", stateLoc)
        );

        const stationSnapshot = await getDocs(stationsQuery);

        console.log(stationSnapshot);

        const results: TrendSeries[] = [];

        // 2️⃣ For each selected brand (nnpc, oando...)
        for (const brand of stations) {
          const brandLower = brand.toLowerCase();
          const grouped: Record<string, number[]> = {};

          // 3️⃣ Match stations whose name includes the brand
          const matchedStations = stationSnapshot.docs.filter((doc) =>
            doc.data().name.toLowerCase().includes(brandLower)
          );

          for (const stationDoc of matchedStations) {
            const reportsRef = collection(
              db,
              "stationss",
              stationDoc.id,
              "reports"
            );

            const reportsSnap = await getDocs(reportsRef);

            reportsSnap.docs.forEach((doc) => {
              const r = doc.data();

              if (
                r.trustStatus !== "valid" ||
                r.fuelType.toLowerCase() !== fuelType.toLowerCase()
              )
                return;

              const reportedAt = r.submittedAt?.toDate?.();
              if (!reportedAt) return;

              if (dayjs(reportedAt).isBefore(dayjs().subtract(days, "day")))
                return;

              const dateKey = dayjs(reportedAt).format("YYYY-MM-DD");

              grouped[dateKey] = grouped[dateKey] || [];
              grouped[dateKey].push(r.price);
            });
          }

          // 4️⃣ Compute daily averages
          const series: TrendPoint[] = Object.entries(grouped)
            .map(([date, prices]) => ({
              date,
              price: prices.reduce((a, b) => a + b, 0) / prices.length,
            }))
            .sort((a, b) => (a.date > b.date ? 1 : -1));

          if (series.length > 0) {
            results.push({
              stationName: brand,
              series,
            });
          }
        }

        setData(results);
      } catch (err) {
        console.error("Fuel trends error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [fuelType, stations, stateLoc, days, trigger]);

  return { data, loading };
};
