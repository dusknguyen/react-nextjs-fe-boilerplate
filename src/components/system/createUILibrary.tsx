import {
  createUIFramework,
  type UIFramework,
  type UIFrameworkConfig,
} from './createUIFramework';

/** Configuration accepted by createUILibrary. */
export type UILibraryConfig = UIFrameworkConfig;

/** Result returned by createUILibrary. */
export type UILibrary = UIFramework;

/**
 * Creates an isolated, configured UI library composition root.
 *
 * The legacy createUIFramework name remains available for backwards compatibility.
 */
export function createUILibrary(config: UILibraryConfig = {}): UILibrary {
  return createUIFramework(config);
}
