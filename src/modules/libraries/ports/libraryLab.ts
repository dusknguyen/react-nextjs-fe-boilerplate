import type { Coordinates, RuntimeDiagnostics, SelectedAsset } from '../domain/library';

/** Inbound query port consumed by diagnostics presentation. */
export interface LibraryDiagnosticsPort {
  readDiagnostics(): Promise<RuntimeDiagnostics>;
}

/** Inbound command port consumed by the interactive capability panel. */
export interface LibraryActionsPort {
  canShare(): Promise<boolean>;
  copy(text: string): Promise<void>;
  locate(): Promise<Coordinates | null>;
  openDirectory(): Promise<void>;
  pickDocument(): Promise<SelectedAsset | null>;
  pickImage(): Promise<SelectedAsset | null>;
  pulse(): Promise<void>;
  share(asset: SelectedAsset): Promise<void>;
  speak(text: string): void;
}

/** Full module facade exposed only by the composition root. */
export type LibraryLabPort = LibraryDiagnosticsPort & LibraryActionsPort;
