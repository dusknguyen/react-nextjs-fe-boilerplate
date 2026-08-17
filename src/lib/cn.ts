/**
 * Application-facing facade for the UI package's class-name composer.
 *
 * Keeping this alias outside the package lets application code depend on one
 * stable import without duplicating a component utility.
 */
export { cn } from '@/src/components';
