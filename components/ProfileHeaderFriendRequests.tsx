import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import { FriendRequestsContext } from '@/contexts/FriendRequestsContext';
import useFriendRequests from '@/hooks/useFriendRequests';
import { FriendRequest, User } from '@/interfaces/interfaces';
import { Box, Button, HStack, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AiOutlineUserDelete, AiOutlineUserAdd } from 'react-icons/ai';

interface ProfileHeaderFriendRequestsProps {
  user: User;
}

const ProfileHeaderFriendRequests = ({
  user,
}: ProfileHeaderFriendRequestsProps) => {
  const { refreshUser } = useContext(CurrentUserContext);
  const {
    friendRequests,
    isLoading,
    isUpdating,
    error,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useContext(FriendRequestsContext);

  const currentUserSentFriendRequest = friendRequests.find(
    (friendRequest) => friendRequest.receiver._id === user?._id
  );
  const currentUserReceivedFriendRequest = friendRequests.find(
    (friendRequest) => friendRequest.sender._id === user?._id
  );

  if (error) return <Spinner />;

  if (currentUserSentFriendRequest)
    return (
      <Button
        isLoading={isUpdating}
        onClick={() => cancelFriendRequest(currentUserSentFriendRequest)}
        leftIcon={<AiOutlineUserDelete />}
      >
        Cancel friend request
      </Button>
    );
  else if (currentUserReceivedFriendRequest)
    return (
      <Stack>
        <Text>{`${user.firstName} has sent you a friend request`}</Text>
        <HStack>
          <Button
            isLoading={isUpdating}
            colorScheme='green'
            onClick={() =>
              acceptFriendRequest(currentUserReceivedFriendRequest, refreshUser)
            }
          >
            Accept
          </Button>
          <Button
            isLoading={isUpdating}
            variant='outline'
            onClick={() =>
              rejectFriendRequest(currentUserReceivedFriendRequest, refreshUser)
            }
          >
            Reject
          </Button>
        </HStack>
      </Stack>
    );
  else
    return (
      <Button
        isLoading={isUpdating}
        onClick={() => sendFriendRequest(user)}
        leftIcon={<AiOutlineUserAdd />}
      >
        Send friend request
      </Button>
    );
};

export default ProfileHeaderFriendRequests;
