import { ReactNode } from 'react';
import { Post, User } from './interfaces';

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
  updatePosts: (post: Post) => void;
}

export interface FeedProps {
  posts: Post[];
}

export interface PostCardProps {
  post: Post;
}

export interface LikeProps {
  isLiked: User | undefined;
  handleClick: () => void;
}

export interface LikesProps {
  currentUserId: string;
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
}

export interface SearchProps {
  query: string | string[] | undefined;
}
