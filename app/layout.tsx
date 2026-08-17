import type { Metadata } from 'next';

import { AppProviders } from '@/src/composition/providers/AppProviders';

import '../style/global.css';

export const metadata: Metadata = {
  title: 'expo-nextjs-boilerplate',
  description: 'expo-nextjs-boilerplate',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
