import { Post } from '@/interfaces/interfaces';
import { createContext } from 'react';

type PostContextProps = {
  post: Post | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  updatePost: (formData: FormData) => void;
  deletePost: (postId: string) => void;
  handleLikeClick: (postId: string) => void;
};

const contextInitializer = {
  post: null,
  isLoading: true,
  isUpdating: false,
  error: null,
  updatePost: () => {},
  deletePost: () => {},
  handleLikeClick: () => {},
};

export const PostContext = createContext<PostContextProps>(contextInitializer);
