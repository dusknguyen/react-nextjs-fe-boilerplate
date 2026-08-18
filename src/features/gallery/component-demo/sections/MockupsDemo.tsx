'use client';

import { Text, View } from 'react-native';

import { BrowserMockup, CodeMockup, CodeMockupLine, PhoneMockup, Theme, ThemeItem, WindowMockup } from '@/src/components';

export default function MockupsDemo() {
  return (
    <>
      <CodeMockup><CodeMockupLine>npm run check</CodeMockupLine><CodeMockupLine>StyleSheet + NativeWind OK</CodeMockupLine></CodeMockup>
      <BrowserMockup><Text className="font-black text-slate-950 dark:text-white">Browser mockup</Text><Text className="mt-2 text-slate-500 dark:text-slate-400">Responsive content on React Native Web.</Text></BrowserMockup>
      <View className="gap-5 md:flex-row">
        <PhoneMockup><Text className="font-black text-slate-950 dark:text-white">Phone mockup</Text><Text className="mt-2 text-slate-500 dark:text-slate-400">Native-first proportions.</Text></PhoneMockup>
        <WindowMockup className="flex-1"><Text className="font-black text-slate-950 dark:text-white">Window mockup</Text><Text className="mt-2 text-slate-500 dark:text-slate-400">Desktop-friendly responsive shell.</Text></WindowMockup>
      </View>
      <Theme><ThemeItem><Text className="font-bold text-slate-950 dark:text-white">Theme follows the NativeWind color scheme</Text></ThemeItem></Theme>
    </>
  );
}
