import type { InheritedComponentProps } from '../../types'; import { View } from 'react-native';
import type { UniversalProps } from '../contracts'; import { Button } from './Button';
/** Props for a controlled page selector. */ export type PaginationProps = InheritedComponentProps<UniversalProps & { onChange?: (page: number) => void; page?: number; total?: number }>;
/** Renders previous, numbered, and next page controls. */ export function Pagination({ onChange, page = 1, total = 3 }: PaginationProps) { const pages = Array.from({ length: total }, (_, index) => index + 1);
  return <View className="flex-row items-center gap-2"><Button disabled={page <= 1} onPress={() => onChange?.(page - 1)} variant="outline">←</Button>{pages.map((item) => <Button key={item} onPress={() => onChange?.(item)} variant={item === page ? 'solid' : 'ghost'}>{item}</Button>)}<Button disabled={page >= total} onPress={() => onChange?.(page + 1)} variant="outline">→</Button></View>;
}
