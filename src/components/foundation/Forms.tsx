'use client';

import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ComponentProps,
} from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
  type AccessibilityActionEvent,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type PressableProps,
  type TextInputProps,
  type ViewProps,
} from 'react-native';

import { cn } from '../core/cn';
import { focusRingClassName } from '../core/styles';
import type { InheritedComponentProps } from '../types';
import { createBox, createText } from './builders';
import type { UniversalProps } from './contracts';

/** Props accepted by the input component. */
export type InputProps = InheritedComponentProps<
  TextInputProps & {
    className?: string;
    invalid?: boolean;
  }
>;

/** Base text input for forms. */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    className,
    invalid,
    placeholderTextColor = '#94A3B8',
    ...props
  },
  ref,
) {
  return (
    <TextInput
      className={cn(
        'min-h-12 rounded-2xl border bg-white px-4 py-3 text-slate-950 shadow-sm web:outline-none web:transition-all web:duration-200 web:focus:border-brand-500 web:focus:ring-2 web:focus:ring-brand-100 dark:bg-slate-900 dark:text-white dark:web:focus:ring-brand-950',
        invalid ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700',
        className,
      )}
      placeholderTextColor={placeholderTextColor}
      ref={ref}
      {...props}
    />
  );
});

/** Props accepted by the textarea component. */
export type TextareaProps = InheritedComponentProps<InputProps>;

/** Multiline text input. */
export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <Input
      className={cn('min-h-28 text-left', className)}
      multiline
      ref={ref}
      textAlignVertical="top"
      {...props}
    />
  );
});

/** Form label primitive. */
export const Label = createText(
  'Label',
  'mb-2 text-sm font-bold text-slate-700 dark:text-slate-200',
);

/** Vertical form layout primitive. */
export const Form = createBox('Form', 'gap-4');

/** Footer layout primitive. */
export const Footer = createBox(
  'Footer',
  'flex-row flex-wrap items-start justify-between gap-6 border-t border-slate-200 py-6 dark:border-slate-800',
);

/** Footer title primitive. */
export const FooterTitle = createText(
  'FooterTitle',
  'text-sm font-black uppercase tracking-[2px] text-slate-950 dark:text-white',
);

/** Props accepted by the checkbox component. */
export type CheckboxProps = InheritedComponentProps<
  Omit<PressableProps, 'onPress'> & {
    checked?: boolean;
    className?: string;
    label?: string;
    onChange?: (checked: boolean) => void;
  }
>;

/** Accessible checkbox implemented with React Native core primitives. */
export function Checkbox({
  checked = false,
  className,
  label,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className={cn(
        'flex-row items-center self-start rounded-xl p-1 active:opacity-75 web:cursor-pointer web:transition-colors web:hover:bg-slate-50 dark:web:hover:bg-slate-800',
        focusRingClassName,
        className,
      )}
      onPress={() => onChange?.(!checked)}
      {...props}
    >
      <View
        className={cn(
          'mr-3 h-6 w-6 items-center justify-center rounded-lg border-2 shadow-sm web:transition-all',
          checked
            ? 'border-brand-600 bg-brand-600'
            : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900',
        )}
      >
        {checked ? <Text className="font-black text-white">✓</Text> : null}
      </View>
      {label ? (
        <Text className="font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

/** Props accepted by the radio component. */
export type RadioProps = InheritedComponentProps<
  CheckboxProps & {
    selected?: boolean;
  }
>;

/** Accessible radio control. */
export function Radio({ checked, selected, ...props }: RadioProps) {
  const active = selected ?? checked ?? false;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: active }}
      className={cn(
        'flex-row items-center self-start web:cursor-pointer',
        focusRingClassName,
        props.className,
      )}
      onPress={() => props.onChange?.(!active)}
    >
      <View
        className={cn(
          'mr-3 h-6 w-6 items-center justify-center rounded-full border-2',
          active ? 'border-brand-600' : 'border-slate-300 dark:border-slate-600',
        )}
      >
        {active ? <View className="h-3 w-3 rounded-full bg-brand-600" /> : null}
      </View>
      {props.label ? (
        <Text className="font-semibold text-slate-700 dark:text-slate-200">
          {props.label}
        </Text>
      ) : null}
    </Pressable>
  );
}

/** Props accepted by the toggle component. */
export type ToggleProps = InheritedComponentProps<
  ComponentProps<typeof Switch> & {
    className?: string;
    label?: string;
  }
>;

/** Switch with an optional label. */
export function Toggle({ className, label, value, ...props }: ToggleProps) {
  return (
    <View className={cn('flex-row items-center justify-between gap-4', className)}>
      {label ? (
        <Text className="flex-1 font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </Text>
      ) : null}
      <Switch
        thumbColor={value ? '#5B5CE2' : '#F8FAFC'}
        trackColor={{ false: '#CBD5E1', true: '#A5B4FC' }}
        value={value}
        {...props}
      />
    </View>
  );
}

/** Props accepted by the dependency-free range control. */
export type RangeProps = InheritedComponentProps<
  Omit<ViewProps, 'onLayout'> & {
    accessibilityLabel?: string;
    className?: string;
    disabled?: boolean;
    maximumValue?: number;
    minimumValue?: number;
    onValueChange?: (value: number) => void;
    step?: number;
    value?: number;
  }
>;

/**
 * Cross-platform slider implemented with React Native core primitives only.
 * Values are clamped and snapped before they are emitted.
 */
export function Range({
  accessibilityLabel = 'Range',
  className,
  disabled = false,
  maximumValue = 100,
  minimumValue = 0,
  onValueChange,
  step = 1,
  value = minimumValue,
  ...props
}: RangeProps) {
  const [trackWidth, setTrackWidth] = useState(1);
  const span = Math.max(Number.EPSILON, maximumValue - minimumValue);
  const safeStep = step > 0 ? step : 1;

  const normalize = useCallback(
    (nextValue: number) => {
      const clamped = Math.min(maximumValue, Math.max(minimumValue, nextValue));
      const snapped =
        minimumValue +
        Math.round((clamped - minimumValue) / safeStep) * safeStep;
      const precision = Math.max(
        0,
        String(safeStep).split('.')[1]?.length ?? 0,
      );
      return Number(Math.min(maximumValue, snapped).toFixed(precision));
    },
    [maximumValue, minimumValue, safeStep],
  );

  const updateFromX = useCallback(
    (x: number) => {
      if (disabled) return;
      const ratio = Math.min(1, Math.max(0, x / trackWidth));
      onValueChange?.(normalize(minimumValue + ratio * span));
    },
    [disabled, minimumValue, normalize, onValueChange, span, trackWidth],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (event) => updateFromX(event.nativeEvent.locationX),
        onPanResponderMove: (event) => updateFromX(event.nativeEvent.locationX),
        onStartShouldSetPanResponder: () => !disabled,
      }),
    [disabled, updateFromX],
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const width = Math.max(1, event.nativeEvent.layout.width);
    setTrackWidth(width);
  };

  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (disabled) return;

    if (event.nativeEvent.actionName === 'increment') {
      onValueChange?.(normalize(value + safeStep));
    }

    if (event.nativeEvent.actionName === 'decrement') {
      onValueChange?.(normalize(value - safeStep));
    }
  };

  const ratio = Math.min(1, Math.max(0, (normalize(value) - minimumValue) / span));
  const thumbOffset = Math.max(0, ratio * trackWidth - 10);

  return (
    <View
      accessibilityActions={[{ name: 'decrement' }, { name: 'increment' }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="adjustable"
      accessibilityState={{ disabled }}
      accessibilityValue={{
        max: maximumValue,
        min: minimumValue,
        now: normalize(value),
      }}
      className={cn('min-h-11 justify-center', disabled && 'opacity-50', className)}
      onAccessibilityAction={onAccessibilityAction}
      onLayout={onLayout}
      {...panResponder.panHandlers}
      {...props}
    >
      <Pressable
        accessibilityElementsHidden
        className="h-2 overflow-hidden rounded-full bg-slate-200 web:cursor-pointer dark:bg-slate-700"
        disabled={disabled}
        importantForAccessibility="no-hide-descendants"
        onPress={(event: GestureResponderEvent) => updateFromX(event.nativeEvent.locationX)}
      >
        <View
          className="h-full rounded-full bg-brand-600"
          style={{ width: `${ratio * 100}%` }}
        />
      </Pressable>
      <View
        className="absolute h-5 w-5 rounded-full border-2 border-white bg-brand-600 shadow-md"
        pointerEvents="none"
        style={{ left: thumbOffset }}
      />
    </View>
  );
}

/** Value-label pair accepted by the select component. */
export type SelectOptionValue = {
  disabled?: boolean;
  label: string;
  value: string;
};

/** Props accepted by the select component. */
export type SelectProps = InheritedComponentProps<
  UniversalProps & {
    accessibilityLabel?: string;
    onValueChange?: (value: string) => void;
    options?: SelectOptionValue[];
    placeholder?: string;
    selectedValue?: string;
  }
>;

/**
 * Dependency-free select. Uses React Native Modal instead of a platform picker
 * package, which keeps the component folder portable across native and web.
 */
export function Select({
  accessibilityLabel = 'Select',
  className,
  onValueChange,
  options = [],
  placeholder = 'Select an option',
  selectedValue,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === selectedValue);

  return (
    <View className={className}>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        className={cn(
          'min-h-12 flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 shadow-sm web:cursor-pointer web:focus-visible:border-brand-500 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:web:focus-visible:ring-brand-950',
          focusRingClassName,
        )}
        onPress={() => setOpen(true)}
      >
        <Text
          className={cn(
            'flex-1 font-semibold',
            selected
              ? 'text-slate-950 dark:text-white'
              : 'text-slate-400 dark:text-slate-500',
          )}
          numberOfLines={1}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Text className="ml-3 text-xs font-black text-slate-400">▼</Text>
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setOpen(false)}
        transparent
        visible={open}
      >
        <View className="flex-1 items-center justify-center bg-slate-950/60 p-5">
          <Pressable
            accessibilityLabel="Close select"
            accessibilityRole="button"
            className="absolute inset-0"
            onPress={() => setOpen(false)}
          />
          <View
            accessibilityViewIsModal
            className="max-h-[70%] w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
          >
            <ScrollView contentContainerClassName="p-2" keyboardShouldPersistTaps="handled">
              {options.length ? (
                options.map((option) => (
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{
                      checked: option.value === selectedValue,
                      disabled: option.disabled,
                    }}
                    className={cn(
                      'min-h-12 justify-center rounded-2xl px-4 web:cursor-pointer web:hover:bg-slate-50 dark:web:hover:bg-slate-800',
                      option.value === selectedValue &&
                        'bg-brand-50 dark:bg-brand-950',
                      option.disabled && 'opacity-40',
                    )}
                    disabled={option.disabled}
                    key={option.value}
                    onPress={() => {
                      onValueChange?.(option.value);
                      setOpen(false);
                    }}
                  >
                    <Text
                      className={cn(
                        'font-semibold text-slate-700 dark:text-slate-200',
                        option.value === selectedValue &&
                          'font-black text-brand-700 dark:text-brand-200',
                      )}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text className="p-4 text-center text-slate-500 dark:text-slate-400">
                  No options
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/** Props accepted by the standalone select-option row. */
export type SelectOptionProps = InheritedComponentProps<
  SelectOptionValue & {
    onPress?: (value: string) => void;
    selected?: boolean;
  }
>;

/** Standalone selectable option row for custom select compositions. */
export function SelectOption({
  disabled,
  label,
  onPress,
  selected,
  value,
}: SelectOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      className={cn(
        'min-h-11 justify-center rounded-xl px-3 web:cursor-pointer',
        selected && 'bg-brand-50 dark:bg-brand-950',
        disabled && 'opacity-40',
      )}
      disabled={disabled}
      onPress={() => onPress?.(value)}
    >
      <Text className="font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </Text>
    </Pressable>
  );
}
