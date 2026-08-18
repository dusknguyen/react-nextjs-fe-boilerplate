import { Stack, type ErrorBoundaryProps } from 'expo-router';
import { AppErrorView } from '@/src/views/system/AppErrorView';
import '../../style/global.css';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <AppErrorView error={error} onRetry={() => void retry()} />;
}

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
