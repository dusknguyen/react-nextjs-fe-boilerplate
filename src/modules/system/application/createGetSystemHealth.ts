import type { SystemHealth } from '../domain/systemHealth';
import type { ClockPort } from '../ports/clock';

export function createGetSystemHealth(clock: ClockPort) {
  return function getSystemHealth(): SystemHealth {
    return {
      checkedAt: clock.now().toISOString(),
      service: 'expo-nextjs-boilerplate',
      status: 'ok',
    };
  };
}
