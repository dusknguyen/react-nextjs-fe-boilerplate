'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Modal as NativeModal,
  Pressable,
  Text,
  View,
} from 'react-native';

import { cn } from '../core/cn';
import { MotionView } from '../core/motion';
import { overlayStyles } from '../styling/overlayStyles';
import type { InheritedComponentProps } from '../types';

/** Describes one command displayed by an action sheet or context menu. */
export type ActionSheetAction = {
  destructive?: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

type ActionSheetProps = InheritedComponentProps<{
  actions: ActionSheetAction[];
  message?: string;
  onClose: () => void;
  open: boolean;
  title?: string;
}>;

/** Presents a platform-native modal list of commands. */
export function ActionSheet({
  actions,
  message,
  onClose,
  open,
  title,
}: ActionSheetProps) {
  return (
    <NativeModal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={open}
    >
      <View className="justify-end bg-slate-950/70 p-3 sm:items-center sm:justify-center" style={overlayStyles.backdrop}>
        <Pressable
          accessibilityLabel="Close action sheet"
          accessibilityRole="button"
          onPress={onClose}
          style={overlayStyles.absoluteFill}
        />

        <MotionView
          accessibilityViewIsModal
          className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
          distance={24}
          style={overlayStyles.elevatedSurface}
        >
          {title || message ? (
            <View className="items-center border-b border-slate-100 p-5 dark:border-slate-800">
              {title ? (
                <Text className="font-black text-slate-950 dark:text-white">
                  {title}
                </Text>
              ) : null}
              {message ? (
                <Text className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
                  {message}
                </Text>
              ) : null}
            </View>
          ) : null}

          {actions.map((action) => (
            <Pressable
              accessibilityRole="button"
              className="min-h-14 items-center justify-center border-b border-slate-100 px-4 active:bg-slate-100 web:cursor-pointer dark:border-slate-800 dark:active:bg-slate-800"
              disabled={action.disabled}
              key={action.label}
              onPress={() => {
                action.onPress();
                onClose();
              }}
            >
              <Text
                className={cn(
                  'font-bold',
                  action.destructive
                    ? 'text-rose-600 dark:text-rose-300'
                    : 'text-brand-600 dark:text-brand-300',
                  action.disabled && 'opacity-40',
                )}
              >
                {action.label}
              </Text>
            </Pressable>
          ))}

          <Pressable
            accessibilityRole="button"
            className="min-h-14 items-center justify-center web:cursor-pointer"
            onPress={onClose}
          >
            <Text className="font-black text-slate-700 dark:text-slate-200">
              Cancel
            </Text>
          </Pressable>
        </MotionView>
      </View>
    </NativeModal>
  );
}

type ConfirmDialogProps = InheritedComponentProps<{
  confirmLabel?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}>;

/** Requests explicit confirmation before executing a destructive or important action. */
export function ConfirmDialog({
  confirmLabel = 'Confirm',
  message,
  onCancel,
  onConfirm,
  open,
  title,
}: ConfirmDialogProps) {
  return (
    <NativeModal
      animationType="fade"
      onRequestClose={onCancel}
      transparent
      visible={open}
    >
      <View className="items-center justify-center bg-slate-950/70 px-5" style={overlayStyles.backdrop}>
        <Pressable
          accessibilityLabel="Cancel confirmation"
          accessibilityRole="button"
          onPress={onCancel}
          style={overlayStyles.absoluteFill}
        />

        <MotionView
          accessibilityViewIsModal
          className="w-full max-w-md rounded-[28px] border border-white/50 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
          style={overlayStyles.elevatedSurface}
        >
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950">
            <Text className="text-xl font-black text-amber-700 dark:text-amber-200">
              !
            </Text>
          </View>
          <Text className="mt-4 text-xl font-black text-slate-950 dark:text-white">
            {title}
          </Text>
          <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
            {message}
          </Text>

          <View className="mt-6 flex-row justify-end gap-3">
            <Pressable
              accessibilityRole="button"
              className="min-h-11 justify-center rounded-xl px-4 web:cursor-pointer"
              onPress={onCancel}
            >
              <Text className="font-bold text-slate-600 dark:text-slate-300">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              className="min-h-11 justify-center rounded-xl bg-brand-600 px-4 web:cursor-pointer"
              onPress={onConfirm}
            >
              <Text className="font-black text-white">{confirmLabel}</Text>
            </Pressable>
          </View>
        </MotionView>
      </View>
    </NativeModal>
  );
}

type PopoverProps = InheritedComponentProps<{
  children: ReactNode;
  content: ReactNode;
  label?: string;
}>;

/** Toggles contextual content next to a trigger. */
export function Popover({
  children,
  content,
  label = 'Toggle popover',
}: PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <View className="relative self-start">
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        className="web:cursor-pointer"
        onPress={() => setOpen((current) => !current)}
      >
        {children}
      </Pressable>

      {open ? (
        <MotionView
          className="absolute left-0 top-full z-20 mt-2 min-w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900"
          distance={6}
          duration={180}
        >
          {content}
        </MotionView>
      ) : null}
    </View>
  );
}

type ContextMenuProps = InheritedComponentProps<{
  children: ReactNode;
  items: ActionSheetAction[];
}>;

/** Opens a menu from press or long-press interaction. */
export function ContextMenu({ children, items }: ContextMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable
        accessibilityLabel="Open context menu"
        accessibilityRole="button"
        className="web:cursor-context-menu"
        onLongPress={() => setOpen(true)}
        onPress={() => setOpen((current) => !current)}
      >
        {children}
      </Pressable>

      {open ? (
        <View
          accessibilityRole="menu"
          className="mt-2 self-start rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {items.map((item) => (
            <Pressable
              accessibilityRole="menuitem"
              className={cn(
                'min-h-11 min-w-48 justify-center rounded-xl px-3 web:cursor-pointer web:hover:bg-slate-100 dark:web:hover:bg-slate-800',
                item.disabled && 'opacity-40',
              )}
              disabled={item.disabled}
              key={item.label}
              onPress={() => {
                item.onPress();
                setOpen(false);
              }}
            >
              <Text
                className={
                  item.destructive
                    ? 'font-bold text-rose-600 dark:text-rose-300'
                    : 'font-bold text-slate-700 dark:text-slate-200'
                }
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

type BlockUIProps = InheritedComponentProps<{
  blocked: boolean;
  children: ReactNode;
  label?: string;
}>;

/** Prevents interaction with content while a blocking operation is active. */
export function BlockUI({
  blocked,
  children,
  label = 'Working…',
}: BlockUIProps) {
  return (
    <View className="relative overflow-hidden rounded-3xl">
      {children}
      {blocked ? (
        <View
          className="z-20 items-center justify-center bg-slate-950/60 p-5"
          style={overlayStyles.absoluteFill}
        >
          <View className="rounded-2xl bg-white px-5 py-3 shadow-xl dark:bg-slate-900">
            <Text className="font-black text-slate-950 dark:text-white">
              {label}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

type OverlayPanelProps = InheritedComponentProps<{
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title?: string;
}>;

/** Renders dismissible content in an inline elevated panel. */
export function OverlayPanel({
  children,
  onClose,
  open,
  title,
}: OverlayPanelProps) {
  if (!open) {
    return null;
  }

  return (
    <View className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <View className="mb-4 flex-row items-center justify-between">
        {title ? (
          <Text className="font-black text-slate-950 dark:text-white">
            {title}
          </Text>
        ) : (
          <View />
        )}
        <Pressable
          accessibilityLabel="Close panel"
          accessibilityRole="button"
          className="p-2 web:cursor-pointer"
          onPress={onClose}
        >
          <Text className="font-black text-slate-500">×</Text>
        </Pressable>
      </View>
      {children}
    </View>
  );
}
