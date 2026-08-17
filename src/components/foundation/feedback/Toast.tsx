import { createBox } from '../builders';
/** Elevated surface for transient feedback content. */ export const Toast = createBox('Toast', 'rounded-2xl border border-slate-200 bg-white p-4 shadow-xl web:transition-transform web:hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900');
