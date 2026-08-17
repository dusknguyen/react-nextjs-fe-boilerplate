/** Keyboard focus treatment shared by interactive web components. */
export const focusRingClassName =
  'web:outline-none web:focus-visible:ring-2 web:focus-visible:ring-brand-500 web:focus-visible:ring-offset-2 dark:web:focus-visible:ring-offset-slate-950';

/** Pointer, hover, and reduced-motion behavior for interactive controls. */
export const interactiveClassName =
  'active:scale-[0.98] active:opacity-85 web:cursor-pointer web:transition-all web:duration-200 web:ease-out web:hover:-translate-y-0.5 web:motion-reduce:transform-none web:motion-reduce:transition-none';

/** Border, elevation, and hover treatment for raised surfaces. */
export const elevatedSurfaceClassName =
  'border border-slate-200/80 bg-white shadow-md web:transition-all web:duration-300 web:ease-out web:hover:-translate-y-0.5 web:hover:border-brand-200 web:hover:shadow-xl web:motion-reduce:transform-none web:motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:web:hover:border-brand-800';
