import { Conversation, FriendRequest, User } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import useCurrentUser from './useCurrentUser';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

const useFriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const toast = useToast();

  const token = checkAuth();

  useEffect(() => {
    try {
      fetch(`${process.env.BACKEND_URL}/friend-requests/user/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) setFriendRequests(data.friendRequests);
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const sendFriendRequest = (receiver: User) => {
    setUpdating(true);
    try {
      fetch(`${process.env.BACKEND_URL}/friend-requests`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiver: receiver._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setFriendRequests([data.friendRequest, ...friendRequests]);
            toast({
              title: `A friend request has been sent to ${receiver.firstName}`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  };

  const cancelFriendRequest = (friendRequest: FriendRequest) => {
    setUpdating(true);
    try {
      fetch(`${process.env.BACKEND_URL}/friend-requests/${friendRequest._id}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.friendRequestToDelete) {
            setFriendRequests(
              friendRequests.filter(
                (friendRequest) =>
                  friendRequest._id !== data.friendRequestToDelete._id
              )
            );
            toast({
              title: `You have canceled the friend request to ${friendRequest.receiver.firstName}`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  };

  const acceptFriendRequest = (
    friendRequest: FriendRequest,
    refreshUser: () => void
  ) => {
    setUpdating(true);
    try {
      fetch(
        `${process.env.BACKEND_URL}/friend-requests/${friendRequest._id}/accept`,
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setFriendRequests(
              friendRequests.filter(
                (friendRequest) => friendRequest._id !== friendRequest._id
              )
            );
            refreshUser();
            toast({
              title: `You have accepted ${friendRequest.sender.firstName}'s friend request`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  };

  const rejectFriendRequest = (
    friendRequest: FriendRequest,
    refreshUser: () => void
  ) => {
    setUpdating(true);
    try {
      fetch(
        `${process.env.BACKEND_URL}/friend-requests/${friendRequest._id}/reject`,
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setFriendRequests(
              friendRequests.filter(
                (friendRequest) => friendRequest._id !== friendRequest._id
              )
            );
            refreshUser();
            toast({
              title: `You have rejected ${friendRequest.sender.firstName}'s friend request`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  };

  return {
    friendRequests,
    isLoading,
    isUpdating,
    error,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  };
};

export default useFriendRequests;
