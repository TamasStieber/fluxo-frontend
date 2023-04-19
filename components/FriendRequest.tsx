import { FriendRequest } from '@/interfaces/interfaces';
import { checkAuth, redirectToProfile } from '@/utils/utils';
import { Box, Button, HStack, Link, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import UserAvatar from './UserAvatar';
import { FriendRequestsContext } from '@/contexts/FriendRequestsContext';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

interface FriendRequestProps {
  friendRequest: FriendRequest;
}

const FriendRequest = ({ friendRequest }: FriendRequestProps) => {
  const { refreshUser } = useContext(CurrentUserContext);
  const { acceptFriendRequest, rejectFriendRequest } = useContext(
    FriendRequestsContext
  );

  const token = checkAuth();

  return (
    <Stack>
      <HStack>
        <UserAvatar user={friendRequest.sender} size='sm' clickable={true} />
        <Text>
          <Link
            fontWeight='bold'
            onClick={() => redirectToProfile(friendRequest.sender.userName)}
          >{`${friendRequest.sender.firstName} ${friendRequest.sender.lastName}`}</Link>{' '}
          has sent you a friend request
        </Text>
      </HStack>
      <HStack justify='flex-end'>
        <Button
          onClick={() => acceptFriendRequest(friendRequest, refreshUser)}
          colorScheme='green'
          size='sm'
        >
          Accept
        </Button>
        <Button
          onClick={() => rejectFriendRequest(friendRequest, refreshUser)}
          variant='outline'
          size='sm'
        >
          Reject
        </Button>
      </HStack>
    </Stack>
  );
};

export default FriendRequest;
