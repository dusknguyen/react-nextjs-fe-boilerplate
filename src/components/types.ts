import { componentColors, componentLayouts, componentPositions, componentSizes, componentShapes, componentStatuses, componentVariants, bgColors, brandColors, } from './constants'; import { DEFAULT_THEMES } from './defaultThemes';
/** Name of a theme bundled with the library. */ export type DataTheme = typeof DEFAULT_THEMES[number]; 
/** Props available to every public component. */
 export interface IComponentBaseProps { dataTheme?: DataTheme; } 
/** Adds the shared component contract to feature-specific props. */
 export type InheritedComponentProps<Props extends object = object> = Props & IComponentBaseProps;
/** Valid semantic color for a component. */ export type ComponentColor = typeof componentColors[number]; 
/** Valid placement for a positioned component. */
 export type ComponentPosition = typeof componentPositions[number];
/** Valid component shape. */ export type ComponentShape = typeof componentShapes[number]; 
/** Valid component size. */
 export type ComponentSize = typeof componentSizes[number];
/** Valid feedback status. */ export type ComponentStatus = typeof componentStatuses[number]; 
/** Valid visual variant. */
 export type ComponentVariant = typeof componentVariants[number];
/** Valid component orientation. */ export type ComponentLayout = typeof componentLayouts[number]; 
/** Valid brand color. */
 export type ComponentBrandColors = typeof brandColors[number];
/** Valid surface background color. */ export type ComponentBgColors = typeof bgColors[number]; 
/** Accepts one item, a list, or nested item lists. */
 export type ListOrItem<T> = T[] | T | (T | T[])[];
