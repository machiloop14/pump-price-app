import { FuelType } from "../types/fuels";

export const FUEL_PRICE_RANGES: Record<FuelType, { min: number; max: number }> =
  {
    petrol: { min: 740, max: 900 },
    diesel: { min: 1200, max: 1600 },
    kerosene: { min: 1000, max: 1200 },
  };

export function isPriceWithinRange(fuelType: FuelType, price: number): boolean {
  const range = FUEL_PRICE_RANGES[fuelType];
  return price >= range.min && price <= range.max;
}
