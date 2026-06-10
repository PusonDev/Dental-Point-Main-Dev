type Primitive = string | number | boolean | null | undefined;

export function deepMerge<T extends Record<string, any>>(base: T, override: Partial<T>): T {
  const output: Record<string, any> = Array.isArray(base) ? [...base] : { ...base };

  for (const [key, value] of Object.entries(override || {})) {
    const baseValue = output[key];
    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      output[key] = deepMerge(baseValue, value as Record<string, any>);
    } else {
      output[key] = value;
    }
  }

  return output as T;
}

export function getNestedValue(object: unknown, path: string): Primitive | Record<string, any> | undefined {
  return path.split(".").reduce<any>((current, key) => current?.[key], object as any);
}
