export function extractState(
  components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
): string | null {
  const stateComponent = components.find((c) =>
    c.types.includes("administrative_area_level_1")
  );

  return stateComponent?.long_name || null;
}
