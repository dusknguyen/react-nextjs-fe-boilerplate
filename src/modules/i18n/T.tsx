'use client';
import i18nextInterpreter from '@/lib/i18nextInterpreter';
import React from 'react';

/**
 *
 */
export function T({ t }: { t: string }) {
  const { translate } = i18nextInterpreter();
  return <>{translate(t)}</>;
}
