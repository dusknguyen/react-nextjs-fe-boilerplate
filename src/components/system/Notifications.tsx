'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Text, View } from 'react-native';

import { FadeIn } from '../animation/Animations';
import { cn } from '../core/cn';
import { UIPortal } from './Portal';

/** Semantic notification tone. */
export type UINotificationTone = 'danger' | 'info' | 'neutral' | 'success' | 'warning';

/** Notification request accepted by the notification service. */
export interface UINotificationInput {
  id?: string;
  message: string;
  duration?: number;
  tone?: UINotificationTone;
}

interface UINotification extends UINotificationInput {
  id: string;
}

/** Imperative notification service exposed through useUINotifications. */
export interface UINotificationService {
  show: (notification: UINotificationInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const NotificationContext = createContext<UINotificationService | null>(null);
const toneClasses: Record<UINotificationTone, string> = {
  danger: 'border-rose-500 bg-rose-600',
  info: 'border-sky-500 bg-sky-600',
  neutral: 'border-slate-700 bg-slate-800 dark:border-slate-300 dark:bg-slate-200',
  success: 'border-emerald-500 bg-emerald-600',
  warning: 'border-amber-400 bg-amber-400',
};
const textClasses: Record<UINotificationTone, string> = {
  danger: 'text-white',
  info: 'text-white',
  neutral: 'text-white dark:text-slate-950',
  success: 'text-white',
  warning: 'text-slate-950',
};

/** Props for UINotificationProvider. */
export interface UINotificationProviderProps {
  children?: ReactNode;
  defaultDuration?: number;
  maxVisible?: number;
}

/** Provides a small dependency-free toast/notification service backed by UIPortal. */
export function UINotificationProvider({
  children,
  defaultDuration = 3500,
  maxVisible = 3,
}: UINotificationProviderProps) {
  const [items, setItems] = useState<UINotification[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    for (const timer of timers.current.values()) clearTimeout(timer);
    timers.current.clear();
    setItems([]);
  }, []);

  const show = useCallback((input: UINotificationInput) => {
    const id = input.id ?? `ui-notification-${++counter.current}`;
    const notification: UINotification = { ...input, id, tone: input.tone ?? 'neutral' };
    setItems((current) => [...current.filter((item) => item.id !== id), notification].slice(-Math.max(1, maxVisible)));
    const duration = Math.max(0, input.duration ?? defaultDuration);
    if (duration > 0) {
      const previous = timers.current.get(id);
      if (previous) clearTimeout(previous);
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
    }
    return id;
  }, [defaultDuration, dismiss, maxVisible]);

  useEffect(() => {
    const visibleIds = new Set(items.map((item) => item.id));
    for (const [id, timer] of timers.current) {
      if (!visibleIds.has(id)) {
        clearTimeout(timer);
        timers.current.delete(id);
      }
    }
  }, [items]);

  useEffect(() => () => {
    for (const timer of timers.current.values()) clearTimeout(timer);
    timers.current.clear();
  }, []);

  const service = useMemo(() => ({ show, dismiss, clear }), [clear, dismiss, show]);

  return (
    <NotificationContext.Provider value={service}>
      {children}
      <UIPortal>
        <View pointerEvents="box-none" className="absolute bottom-4 left-4 right-4 items-center gap-2">
          {items.map((item) => {
            const tone = item.tone ?? 'neutral';
            return (
              <FadeIn
                accessibilityLiveRegion="polite"
                accessibilityRole="alert"
                className={cn('w-full max-w-xl rounded-xl border px-4 py-3 shadow-lg', toneClasses[tone])}
                key={item.id}
              >
                <Text className={cn('text-sm font-medium', textClasses[tone])}>{item.message}</Text>
              </FadeIn>
            );
          })}
        </View>
      </UIPortal>
    </NotificationContext.Provider>
  );
}

/** Reads the nearest notification service. */
export function useUINotifications(): UINotificationService {
  const value = useContext(NotificationContext);
  if (!value) throw new Error('useUINotifications must be used inside UINotificationProvider.');
  return value;
}
