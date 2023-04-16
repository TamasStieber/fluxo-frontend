import { User } from '@/interfaces/interfaces';
import { createContext } from 'react';

type UserContextProps = {
  currentUser: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  updateUser: (formData: FormData) => void;
  refreshUser: () => void;
};

const contextInitializer = {
  currentUser: null,
  isLoading: true,
  isUpdating: false,
  error: null,
  updateUser: () => {},
  refreshUser: () => {},
};

export const CurrentUserContext =
  createContext<UserContextProps>(contextInitializer);
