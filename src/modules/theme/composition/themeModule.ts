import { createThemePreferencesService } from '../application/createThemePreferencesService';
import { accentThemeStyles } from '../infrastructure/nativeWindThemeStyles';
import { zustandThemePreferencesRepository } from '../infrastructure/zustandThemePreferencesRepository';

export const themePreferencesService = createThemePreferencesService(zustandThemePreferencesRepository);
export { accentThemeStyles };
