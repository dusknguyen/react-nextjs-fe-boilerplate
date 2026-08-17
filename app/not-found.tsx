'use client';

import { useRouter } from 'next/navigation';

import NotFoundView from '@/src/views/system/NotFoundView';

export default function NotFoundPage() {
  const router = useRouter();
  return <NotFoundView onHome={() => router.replace('/')} />;
}
