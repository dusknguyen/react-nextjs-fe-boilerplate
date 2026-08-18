import { createLibraryLabService } from '../application/createLibraryLabService';
import { expoContentSelection } from '../infrastructure/content/expoContentSelection';
import { expoExternalActions } from '../infrastructure/external/expoExternalActions';
import { expoDeviceFeedback } from '../infrastructure/feedback/expoDeviceFeedback';
import { expoLocation } from '../infrastructure/location/expoLocation';
import { expoRuntimeDiagnostics } from '../infrastructure/runtime/expoRuntimeDiagnostics';

export const libraryLabService = createLibraryLabService({
  content: expoContentSelection,
  diagnostics: expoRuntimeDiagnostics,
  external: expoExternalActions,
  feedback: expoDeviceFeedback,
  location: expoLocation,
});
