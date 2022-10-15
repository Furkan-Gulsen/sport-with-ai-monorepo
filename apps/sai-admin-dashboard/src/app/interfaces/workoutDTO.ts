import { ActivityDayDTO } from './activityDayDTO';

export interface WorkoutDTO {
  id?: string;
  information?: string;
  imageURL?: string;
  kind?: string;
  name?: string;
  creationDate?: Date;
  activityDays?: ActivityDayDTO[];
}
