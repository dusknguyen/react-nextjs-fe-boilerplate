/** Generic capability adapter contract. */
export interface UIAdapter<Capability extends string = string, Value = unknown> {
  capability: Capability;
  value: Value;
}

/** Immutable adapter registry returned by createAdapterRegistry. */
export interface UIAdapterRegistry {
  has: (capability: string) => boolean;
  get: <Value = unknown>(capability: string) => Value | undefined;
  require: <Value = unknown>(capability: string) => Value;
  keys: () => readonly string[];
}

/** Creates a dependency-inversion registry for optional native capabilities. */
export function createAdapterRegistry(adapters: readonly UIAdapter[] = []): UIAdapterRegistry {
  const values = new Map(adapters.map((adapter) => [adapter.capability, adapter.value]));
  return {
    has: (capability) => values.has(capability),
    get: <Value,>(capability: string) => values.get(capability) as Value | undefined,
    require: <Value,>(capability: string) => {
      if (!values.has(capability)) throw new Error(`Missing UI adapter: ${capability}`);
      return values.get(capability) as Value;
    },
    keys: () => Object.freeze([...values.keys()]),
  };
}
