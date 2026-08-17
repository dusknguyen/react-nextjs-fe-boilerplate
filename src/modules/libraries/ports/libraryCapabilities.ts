import type { Coordinates, RuntimeDiagnostics, SelectedAsset } from '../domain/library';

export interface RuntimeDiagnosticsPort {
  read(): Promise<RuntimeDiagnostics>;
}

export interface ContentSelectionPort {
  pickDocument(): Promise<SelectedAsset | null>;
  pickImage(): Promise<SelectedAsset | null>;
}

export interface DeviceFeedbackPort {
  copy(text: string): Promise<void>;
  pulse(): Promise<void>;
  speak(text: string): void;
}

export interface LocationPort {
  locate(): Promise<Coordinates | null>;
}

export interface ExternalActionPort {
  canShare(): Promise<boolean>;
  open(url: string): Promise<void>;
  share(asset: SelectedAsset): Promise<void>;
}
