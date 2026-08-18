'use client';

import { useCallback } from 'react';
import { useControllableState } from './useControllableState';

/** Options for useDisclosure. */
export interface DisclosureOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Standard open/close/toggle state for dialogs, sheets, menus and disclosures. */
export function useDisclosure(options: DisclosureOptions = {}) {
  const [open, setOpen] = useControllableState({
    value: options.open,
    defaultValue: options.defaultOpen ?? false,
    onChange: options.onOpenChange,
  });
  const show = useCallback(() => setOpen(true), [setOpen]);
  const hide = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);
  return { open, setOpen, show, hide, toggle } as const;
}
