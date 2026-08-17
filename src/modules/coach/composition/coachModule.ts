import { createCoachDayService } from '../application/createCoachDayService';
import { zustandCoachDayRepository } from '../infrastructure/zustandCoachDayRepository';

export const coachDayService = createCoachDayService(zustandCoachDayRepository);
