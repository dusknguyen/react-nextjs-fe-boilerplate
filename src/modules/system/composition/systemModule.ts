import { createGetSystemHealth } from '../application/createGetSystemHealth';
import { systemClock } from '../infrastructure/systemClock';

export const getSystemHealth = createGetSystemHealth(systemClock);
