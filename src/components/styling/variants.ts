import { cn, type ClassValue } from '../core/cn';

/** Variant schema accepted by createVariants. */
export type VariantSchema = Record<string, Record<string, string>>;

/** Selected values for a variant schema. */
export type VariantSelection<Schema extends VariantSchema> = {
  [Key in keyof Schema]?: keyof Schema[Key] | null | false;
};

/** Configuration for a dependency-free class variant recipe. */
export interface VariantConfig<Schema extends VariantSchema> {
  base?: string;
  variants: Schema;
  defaults?: VariantSelection<Schema>;
}

/** Creates a type-safe NativeWind class recipe without adding a CVA dependency. */
export function createVariants<Schema extends VariantSchema>(config: VariantConfig<Schema>) {
  return (selection: VariantSelection<Schema> = {}, ...extra: ClassValue[]): string => {
    const classes: ClassValue[] = [config.base];
    for (const rawKey of Object.keys(config.variants)) {
      const key = rawKey as keyof Schema;
      const selected = selection[key] ?? config.defaults?.[key];
      if (selected === null || selected === false || selected === undefined) continue;
      const values = config.variants[key];
      const value = values?.[String(selected)];
      if (value) classes.push(value);
    }
    return cn(...classes, ...extra);
  };
}

/** Slot recipe contract used by compound components. */
export type SlotClasses<Slot extends string> = Record<Slot, string>;

/** Merges base slot classes with sparse overrides. */
export function mergeSlots<Slot extends string>(
  base: SlotClasses<Slot>,
  overrides: Partial<SlotClasses<Slot>> = {},
): SlotClasses<Slot> {
  return Object.fromEntries(
    Object.keys(base).map((key) => [key, cn(base[key as Slot], overrides[key as Slot])]),
  ) as SlotClasses<Slot>;
}
