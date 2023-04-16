import { Conversation, FriendRequest, User } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const useFriendRequests = (user: User | null) => {
  const [friendRequest, setFriendRequest] = useState<FriendRequest | null>(
    null
  );
  const [isLoading, setLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const toast = useToast();

  const token = checkAuth();

  useEffect(() => {
    try {
      fetch(`${process.env.BACKEND_URL}/friend-requests/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) setFriendRequest(data.friendRequest);
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [token, user?._id]);

  const sendFriendRequest = () => {
    setUpdating(true);
    try {
      fetch(`${process.env.BACKEND_URL}/friend-requests`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiver: user?._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setFriendRequest(data.friendRequest);
            toast({
              title: `A friend request has been sent to ${user?.firstName}`,
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

  const cancelFriendRequest = () => {
    setUpdating(true);
    try {
      fetch(
        `${process.env.BACKEND_URL}/friend-requests/${friendRequest?._id}`,
        {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.friendRequestToDelete) {
            setFriendRequest(null);
            toast({
              title: `You have canceled the friend request to ${user?.firstName}`,
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

  const acceptFriendRequest = () => {
    setUpdating(true);
    try {
      fetch(
        `${process.env.BACKEND_URL}/friend-requests/${friendRequest?._id}/accept`,
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.friendRequestToDelete) setFriendRequest(null);
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  };

  const rejectFriendRequest = () => {
    setUpdating(true);
    try {
      fetch(
        `${process.env.BACKEND_URL}/friend-requests/${friendRequest?._id}/reject`,
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.friendRequestToDelete) setFriendRequest(null);
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  };

  return {
    friendRequest,
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
