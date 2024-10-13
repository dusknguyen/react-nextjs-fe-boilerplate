// src/components/Container.tsx

import React, { ReactNode } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';

const containerWidths = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
  xxl: 1320,
};

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface ContainerProps {
  children: ReactNode;
  fluid?: boolean;
  breakpoint?: Breakpoint;
}

export const Container = ({ children, fluid, breakpoint }: ContainerProps) => {
  const { width } = useWindowDimensions();

  let maxWidth = width;

  if (fluid) {
    maxWidth = width;
  } else if (breakpoint) {
    const bpWidth = containerWidths[breakpoint];
    const bpMin = {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    }[breakpoint];

    if (width >= bpMin) {
      maxWidth = bpWidth;
    }
  } else {
    if (width >= 1400) maxWidth = containerWidths.xxl;
    else if (width >= 1200) maxWidth = containerWidths.xl;
    else if (width >= 992) maxWidth = containerWidths.lg;
    else if (width >= 768) maxWidth = containerWidths.md;
    else if (width >= 576) maxWidth = containerWidths.sm;
  }

  return (
    <View style={[styles.container, { width: '100%', maxWidth }]}> 
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
});