export type FuelType = "petrol" | "diesel" | "kerosene";

export const FUEL_LABELS: Record<FuelType, string> = {
  petrol: "Petrol (PMS)",
  diesel: "Diesel (AGO)",
  kerosene: "Kerosene (DPK)",
};
