'use client';
import PublicLayout from '@/components/layouts/PublicLayout';
import React from 'react';
/**
 *
 */
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicLayout>{children} </PublicLayout>
    </>
  );
}
