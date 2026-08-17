import type { ClockPort } from '../ports/clock';

export const systemClock: ClockPort = {
  now: () => new Date(),
};
