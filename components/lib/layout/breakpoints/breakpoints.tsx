import { useWindowDimensions } from 'react-native';

export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export function useBreakpoint() {
  const { width } = useWindowDimensions();

  return {
    isXs: width < breakpoints.sm,
    isSm: width >= breakpoints.sm && width < breakpoints.md,
    isMd: width >= breakpoints.md && width < breakpoints.lg,
    isLg: width >= breakpoints.lg && width < breakpoints.xl,
    isXl: width >= breakpoints.xl && width < breakpoints.xxl,
    isXxl: width >= breakpoints.xxl,
    width,
  };
}

export type Breakpoint = keyof typeof breakpoints;