import { PostDTO } from './postDTO';
import { UserDTO } from './userDTO';

export interface CommentDTO {
  id?: string;
  creationDate?: Date;
  postId?: string;
  post?: PostDTO;
  commentUserId?: string;
  commentUser?: UserDTO;
  comment?: string;
}
