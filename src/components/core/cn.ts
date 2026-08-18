/** A class token; falsy values are omitted during composition. */
export type ClassValue = string | false | null | undefined;

/** Dependency-free class composition for extracting this UI library into any project. */
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}
