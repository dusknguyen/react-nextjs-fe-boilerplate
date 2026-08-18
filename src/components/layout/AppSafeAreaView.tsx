import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import type { InheritedComponentProps } from '../types';

/** Insets supplied by the host safe-area adapter. */
export type AppSafeAreaInsets = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

/** Safe-area edges that should contribute padding. */
export type AppSafeAreaEdge = keyof AppSafeAreaInsets;

/** Props shared by native and web safe-area adapters. */
export type AppSafeAreaViewProps = InheritedComponentProps<
  ViewProps & {
    children?: ReactNode;
    edges?: readonly AppSafeAreaEdge[];
    insets?: Partial<AppSafeAreaInsets>;
  }
>;

const allEdges: readonly AppSafeAreaEdge[] = ['top', 'right', 'bottom', 'left'];

/**
 * Dependency-free safe-area boundary.
 * The host injects measured insets from its preferred safe-area implementation.
 */
export function AppSafeAreaView({
  edges = allEdges,
  insets,
  style,
  ...props
}: AppSafeAreaViewProps) {
  const safeInsets: AppSafeAreaInsets = {
    bottom: Math.max(0, insets?.bottom ?? 0),
    left: Math.max(0, insets?.left ?? 0),
    right: Math.max(0, insets?.right ?? 0),
    top: Math.max(0, insets?.top ?? 0),
  };

  const insetStyle = {
    paddingBottom: edges.includes('bottom') ? safeInsets.bottom : 0,
    paddingLeft: edges.includes('left') ? safeInsets.left : 0,
    paddingRight: edges.includes('right') ? safeInsets.right : 0,
    paddingTop: edges.includes('top') ? safeInsets.top : 0,
  };

  return <View style={StyleSheet.compose(insetStyle, style)} {...props} />;
}
