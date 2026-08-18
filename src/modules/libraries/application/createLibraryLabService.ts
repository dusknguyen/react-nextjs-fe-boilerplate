import type { SelectedAsset } from '../domain/library';
import type {
  ContentSelectionPort,
  DeviceFeedbackPort,
  ExternalActionPort,
  LocationPort,
  RuntimeDiagnosticsPort,
} from '../ports/libraryCapabilities';
import type { LibraryLabPort } from '../ports/libraryLab';

export type LibraryLabDependencies = {
  content: ContentSelectionPort;
  diagnostics: RuntimeDiagnosticsPort;
  external: ExternalActionPort;
  feedback: DeviceFeedbackPort;
  location: LocationPort;
};

export function createLibraryLabService({
  content,
  diagnostics,
  external,
  feedback,
  location,
}: LibraryLabDependencies): LibraryLabPort {
  return {
    canShare: () => external.canShare(),
    copy: (text: string) => feedback.copy(text),
    locate: () => location.locate(),
    openDirectory: () => external.open('https://reactnative.directory/packages?android=true&web=true'),
    pickDocument: () => content.pickDocument(),
    pickImage: () => content.pickImage(),
    pulse: () => feedback.pulse(),
    readDiagnostics: () => diagnostics.read(),
    share: (asset: SelectedAsset) => external.share(asset),
    speak: (text: string) => feedback.speak(text),
  };
}
