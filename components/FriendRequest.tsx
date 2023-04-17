import { FriendRequest } from '@/interfaces/interfaces';
import { checkAuth, redirectToProfile } from '@/utils/utils';
import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserAvatar from './UserAvatar';
import useFriendRequests from '@/hooks/useFriendRequests';

interface FriendRequestProps {
  id: string;
  onOperation: () => void;
}

const FriendRequest = ({ id, onOperation }: FriendRequestProps) => {
  const [friendRequest, setFriendRequest] = useState<FriendRequest | null>(
    null
  );
  const { acceptFriendRequest, rejectFriendRequest } = useFriendRequests();

  const token = checkAuth();

  const handleAcceptFriendRequest = () => {
    acceptFriendRequest(id);
    onOperation();
  };

  const handleRejectFriendRequest = () => {
    rejectFriendRequest(id);
    onOperation();
  };

  useEffect(() => {
    try {
      fetch(`${process.env.BACKEND_URL}/friend-requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) setFriendRequest(data.friendRequest);
        });
    } catch (error) {
      console.error(error);
    }
  }, [id, token]);

  if (!friendRequest) return null;

  return (
    <Stack>
      <HStack>
        <UserAvatar user={friendRequest.sender} size='sm' />
        <Text>{`${friendRequest.sender.firstName} ${friendRequest.sender.lastName} has sent you a friend request`}</Text>
      </HStack>
      <HStack justify='flex-end'>
        <Button
          onClick={handleAcceptFriendRequest}
          colorScheme='green'
          size='sm'
        >
          Accept
        </Button>
        <Button onClick={handleRejectFriendRequest} variant='outline' size='sm'>
          Reject
        </Button>
      </HStack>
    </Stack>
  );
};

export default FriendRequest;
