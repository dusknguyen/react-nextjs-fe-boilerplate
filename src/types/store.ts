import { RouteItem, RouteWithChildren } from '@/routes';

// Sidebar State Type
export type SidebarState = {
  components: boolean;
  utilities: boolean;
  pages: boolean;
  toggleSection: (section: keyof SidebarState) => void;
};
export type SidebarSectionProps = {
  section: string;
  sectionRoutes: RouteItem | RouteWithChildren | undefined;
  isOpen: boolean;
  toggleOpen: (section: keyof SidebarState) => void;
};
export type LanguageState = {
  language: string;
  setLanguage: (language: string) => void;
};
