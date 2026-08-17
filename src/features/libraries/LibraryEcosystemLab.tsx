'use client';

import { View } from 'react-native';

import type { PageNavigationPort } from '@/src/modules/navigation/ports/navigation';
import { AppPageShell } from '@/src/views/layout/AppPageShell';

import { LibraryCatalogPanel } from './presentation/LibraryCatalogPanel';
import { LibraryHero } from './presentation/LibraryHero';
import { RuntimeDiagnosticsPanel } from './presentation/RuntimeDiagnosticsPanel';
import { UniversalActionsPanel } from './presentation/UniversalActionsPanel';
import { ValidationDemo } from './presentation/ValidationDemo';
import { VisualLibraryDemos } from './presentation/VisualLibraryDemos';

export default function LibraryEcosystemLab({ navigation }: { navigation: PageNavigationPort }) {
  return (
    <AppPageShell
      activeRoute="libraries"
      description="Maintained Android + Web libraries applied behind explicit architecture boundaries."
      eyebrow="Ecosystem reference"
      maxWidthClassName="max-w-6xl"
      navigation={navigation}
      title="Universal libraries lab"
    >
      <LibraryHero />
      <View className="gap-6">
        <LibraryCatalogPanel />
        <VisualLibraryDemos />
        <ValidationDemo />
        <View className="gap-6 lg:flex-row">
          <RuntimeDiagnosticsPanel />
          <UniversalActionsPanel />
        </View>
      </View>
    </AppPageShell>
  );
}
