'use client';

import { AppErrorView } from '@/src/views/system/AppErrorView';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <AppErrorView error={error} onRetry={reset} />
      </body>
    </html>
  );
}
