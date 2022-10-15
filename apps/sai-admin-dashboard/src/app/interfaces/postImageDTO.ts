import { PostDTO } from './index';

export interface PostImageDTO {
  id?: string;
  imageURL?: string;
  postId?: string;
  post?: PostDTO;
}
