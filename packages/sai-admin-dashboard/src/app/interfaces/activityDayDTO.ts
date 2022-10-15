import { ActivityDTO } from './activityDTO';
import { WorkoutDTO } from './workoutDTO';

export interface ActivityDayDTO {
  id?: string;
  workoutId?: string;
  workout?: WorkoutDTO;
  day?: number;
  creationDate?: Date;
  activiteIDs?: string[];
  activities?: ActivityDTO[];
}
