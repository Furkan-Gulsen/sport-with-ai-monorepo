import { ActivityDayDTO } from './activityDayDTO';

export interface ActivityDTO {
  id?: string;
  creationDate?: Date;
  name?: string;
  imageURL?: string;
  numberOfRepetitions?: number;
  isAI?: boolean;
  activityDays?: ActivityDayDTO;
  calorie?: number;
}
