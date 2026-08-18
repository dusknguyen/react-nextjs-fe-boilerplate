'use client';

import type { ReactNode } from 'react';

import type { InheritedComponentProps } from '../../types';
import type { ExternalNavigationPort } from '../../navigation/NavigationPort';
import { parseSafeUrl, type SafeUrlOptions } from '../../security/Security';
import { Link, type LinkProps } from './Link';

/** Props for a validated external link controlled by a host navigation adapter. */
export type ExternalLinkProps = InheritedComponentProps<
  Omit<LinkProps, 'children' | 'onPress'> & {
    children?: ReactNode;
    href: string;
    navigation: ExternalNavigationPort;
    onNavigationError?: (error: unknown) => void;
    safeUrlOptions?: SafeUrlOptions;
  }
>;

/** Validates external URLs before delegating navigation to the host application. */
export function ExternalLink({
  children,
  href,
  navigation,
  onNavigationError,
  safeUrlOptions,
  ...props
}: ExternalLinkProps) {
  const open = () => {
    try {
      const url = parseSafeUrl(href, safeUrlOptions);
      Promise.resolve(navigation.open(url)).catch((error: unknown) => {
        onNavigationError?.(error);
      });
    } catch (error) {
      onNavigationError?.(error);
    }
  };

  return (
    <Link {...props} onPress={open}>
      {children}
    </Link>
  );
}
