import { ReactNode } from 'react';
import { Post, PostFormData, User } from './interfaces';

export interface MainWrapperProps {
  children: ReactNode;
}

export interface LogoProps {
  size: string;
}

export interface PageContainerProps {
  children: ReactNode;
}

export interface CreatePostProps {
  createPost: (postFormData: PostFormData) => void;
  isCreating: boolean;
}

export interface PostCardProps {
  post: Post;
}

export interface LikeProps {
  isLiked: User | undefined;
  handleClick: () => void;
}

export interface LikesProps {
  post: Post;
}

export interface ProfileProps {
  user: User | null;
}

export interface ProfileHeaderProps {
  user: User | null;
}

export interface ProfileContentProps {
  user: User | null;
}

export interface UserSettingsProps {
  user: User | null;
}

export interface UserCardProps {
  user: User;
}

export interface UserAvatarProps {
  user: User | null;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  url?: string;
  clickable?: boolean;
  tooltip?: boolean;
}

export interface SearchProps {
  query: string;
}

export interface FormattedPostContentProps {
  length: number;
  content: Post['content'];
}

export enum CreatePostModalOptions {
  Text = 'text',
  Photos = 'photos',
}
