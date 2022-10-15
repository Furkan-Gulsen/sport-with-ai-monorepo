import { UserDTO, PostImageDTO } from './index';
import { PostPoolDTO } from './postPoolDTO';

export interface PostDTO {
  id?: string;
  userId?: string;
  user?: UserDTO;
  creationDate?: Date;
  content?: string;
  postType?: 'pool' | 'image' | 'text';
  usersWhoLike?: string[];
  postComments?: string;
  postImage?: PostImageDTO;
  postVideo?: boolean;
  pool?: PostPoolDTO;
}
