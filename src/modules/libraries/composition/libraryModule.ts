import { createLibraryLabService } from '../application/createLibraryLabService';
import {
  expoContentSelection,
  expoDeviceFeedback,
  expoExternalActions,
  expoLocation,
  expoRuntimeDiagnostics,
} from '../infrastructure/expoLibraryCapabilities';

export const libraryLabService = createLibraryLabService({
  content: expoContentSelection,
  diagnostics: expoRuntimeDiagnostics,
  external: expoExternalActions,
  feedback: expoDeviceFeedback,
  location: expoLocation,
});
