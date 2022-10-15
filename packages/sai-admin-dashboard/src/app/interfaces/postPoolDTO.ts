import { PostDTO } from './index';

export interface PostPoolDTO {
  id?: string;
  options?: number[];
  statistics?: number[];
  postId?: string;
  post?: PostDTO;
  userAnsweredPool?: any;
}
