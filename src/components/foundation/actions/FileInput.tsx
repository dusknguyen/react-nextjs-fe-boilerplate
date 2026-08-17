import type { InheritedComponentProps } from '../../types'; import { Button, type ButtonProps } from './Button';
/** Props for a file-selection trigger and its selected-file label. */ export type FileInputProps = InheritedComponentProps<ButtonProps & { fileName?: string }>;
/** Renders a platform-neutral trigger for a consumer-owned file picker. */ export function FileInput({ fileName, onPress, ...props }: FileInputProps) {
  return <Button onPress={onPress} variant="outline" {...props}>{fileName ?? 'Choose file'}</Button>;
}
