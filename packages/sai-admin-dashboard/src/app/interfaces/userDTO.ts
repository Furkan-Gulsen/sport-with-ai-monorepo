export interface UserDTO {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  token?: string;
  registerDate?: Date;
  isNotifyActive?: boolean;
  theFirstDayOfWeek?: string;
  trainingDays?: number;
  isAccountActive?: boolean;
  profilePhoto?: string;
  role?: string;
}
