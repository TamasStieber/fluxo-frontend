import { Post, PostFormData } from '@/interfaces/interfaces';
import { createContext } from 'react';

type PostsContextProps = {
  posts: Post[];
  isLoading: boolean;
  isCreating: boolean;
  error: Error | null;
  createPost: (postFormData: FormData, onClose: () => void) => void;
};

const contextInitializer = {
  posts: [],
  isLoading: true,
  isCreating: false,
  error: null,
  createPost: () => {},
};

export const PostsContext =
  createContext<PostsContextProps>(contextInitializer);
