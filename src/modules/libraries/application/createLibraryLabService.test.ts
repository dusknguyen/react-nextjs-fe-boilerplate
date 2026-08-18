import type { SelectedAsset } from '../domain/library';
import type { LibraryLabDependencies } from './createLibraryLabService';
import { createLibraryLabService } from './createLibraryLabService';

function createDependencies(): LibraryLabDependencies {
  return {
    content: {
      pickDocument: jest.fn(async () => null),
      pickImage: jest.fn(async () => null),
    },
    diagnostics: {
      read: jest.fn(async () => ({
        batteryPercent: 80,
        connectionType: 'wifi',
        deviceName: 'Test device',
        internetReachable: true,
        locale: 'en-US',
        networkType: 'WIFI',
        osName: 'test',
        sessionFingerprint: 'test-session',
      })),
    },
    external: {
      canShare: jest.fn(async () => true),
      open: jest.fn(async () => undefined),
      share: jest.fn(async () => undefined),
    },
    feedback: {
      copy: jest.fn(async () => undefined),
      pulse: jest.fn(async () => undefined),
      speak: jest.fn(),
    },
    location: {
      locate: jest.fn(async () => ({ latitude: 10, longitude: 106 })),
    },
  };
}

describe('library lab application service', () => {
  it('orchestrates only through injected output ports', async () => {
    const dependencies = createDependencies();
    const service = createLibraryLabService(dependencies);
    const asset: SelectedAsset = { kind: 'document', name: 'plan.pdf', uri: 'file://plan.pdf' };

    await service.copy('value');
    await service.share(asset);
    service.speak('hello');

    expect(dependencies.feedback.copy).toHaveBeenCalledWith('value');
    expect(dependencies.external.share).toHaveBeenCalledWith(asset);
    expect(dependencies.feedback.speak).toHaveBeenCalledWith('hello');
  });

  it('keeps the external directory URL inside the use case', async () => {
    const dependencies = createDependencies();
    const service = createLibraryLabService(dependencies);

    await service.openDirectory();

    expect(dependencies.external.open).toHaveBeenCalledWith(
      'https://reactnative.directory/packages?android=true&web=true',
    );
  });
});
