'use client';

import { useState } from 'react';
import { Text, View } from 'react-native';

import { Backdrop, Box, Button, Container, Paper } from '@/src/components';

/**
 * Demonstrates the three low-level primitives that are intentionally absent
 * from the denser catalog examples. State stays in the feature layer while
 * the shared component package remains presentation-only and unchanged.
 */
export function PrimitiveBoundaryShowcase() {
  const [backdropOpen, setBackdropOpen] = useState(false);

  return (
    <View className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 py-6 dark:border-slate-800 dark:bg-slate-950">
      <Container maxWidth="md">
        <Box className="gap-5">
          <View>
            <Text className="text-xs font-black uppercase tracking-[2px] text-brand-600 dark:text-brand-300">
              Primitive boundaries
            </Text>
            <Text className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
              Box, Container and Backdrop
            </Text>
            <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
              Container constrains responsive width, Box composes native layout, and Backdrop owns a focused modal layer.
            </Text>
          </View>

          <Paper elevation={2}>
            <Text className="font-black text-slate-950 dark:text-white">Nested inside the shared primitives</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              This demo imports the public component API without changing its implementation.
            </Text>
            <View className="mt-4 self-start">
              <Button onPress={() => setBackdropOpen(true)}>Open backdrop</Button>
            </View>
          </Paper>
        </Box>
      </Container>

      <Backdrop onPress={() => setBackdropOpen(false)} open={backdropOpen}>
        <Paper className="w-full max-w-md" elevation={4}>
          <Text className="text-xl font-black text-slate-950 dark:text-white">Backdrop is active</Text>
          <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
            Press outside this surface or use the action below to close it.
          </Text>
          <View className="mt-5 self-end">
            <Button onPress={() => setBackdropOpen(false)}>Close</Button>
          </View>
        </Paper>
      </Backdrop>
    </View>
  );
}
