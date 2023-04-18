import { FriendRequest, User } from '@/interfaces/interfaces';
import { createContext } from 'react';

type FriendRequestsProps = {
  friendRequests: FriendRequest[];
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  sendFriendRequest: (receiver: User) => void;
  cancelFriendRequest: (friendRequest: FriendRequest) => void;
  acceptFriendRequest: (
    friendRequest: FriendRequest,
    refreshUser: () => void
  ) => void;
  rejectFriendRequest: (
    friendRequest: FriendRequest,
    refreshUser: () => void
  ) => void;
};

const contextInitializer = {
  friendRequests: [],
  isLoading: true,
  isUpdating: false,
  error: null,
  sendFriendRequest: () => {},
  cancelFriendRequest: () => {},
  acceptFriendRequest: () => {},
  rejectFriendRequest: () => {},
};

export const FriendRequestsContext =
  createContext<FriendRequestsProps>(contextInitializer);
