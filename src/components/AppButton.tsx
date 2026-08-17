import type { InheritedComponentProps } from './types'; import type { ComponentProps } from 'react';
import { Button } from './foundation/actions/Button';
/** Application-level button props with a deliberately small variant vocabulary. */ export type AppButtonProps = InheritedComponentProps<Omit<ComponentProps<typeof Button>, 'variant'> & { variant?: 'primary' | 'secondary' | 'ghost'; }>;
/** Renders the application button while translating app variants to foundation styles. */
export function AppButton({ variant = 'primary', ...props }: AppButtonProps) { return (<Button size="large" variant={variant === 'secondary' ? 'outline' : variant === 'ghost' ? 'ghost' : 'solid'} {...props}/>); }
