import { ProfileHeaderProps } from '@/interfaces/props';
import { Avatar, Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { AiOutlineUserAdd, AiOutlineEdit } from 'react-icons/ai';
import { IoMailOutline } from 'react-icons/io5';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/router';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { checkAuth, formatDate } from '@/utils/utils';
import useFriendRequests from '@/hooks/useFriendRequests';

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    friendRequest,
    isLoading,
    isUpdating,
    error,
    sendFriendRequest,
    cancelFriendRequest,
  } = useFriendRequests(user);
  const router = useRouter();

  const date = user && new Date(user.createdAt);

  const isAcquaintance = currentUser?.acquaintances.find(
    (acquaintance) => acquaintance.email === user?.email
  );
  const sameUser = currentUser?.email === user?.email && true;

  // const isFriendRequestPending = friendRequests.find(
  //   (friendRequest) => friendRequest.receiver === user?._id
  // );

  const handleSendMessage = () => {
    localStorage.setItem('userToMessage', JSON.stringify(user));
    router.push('/messages');
  };

  return (
    <Box marginY={2} borderRadius='10px'>
      <HStack spacing={4}>
        <UserAvatar user={user} size='2xl' />
        <Stack spacing={4}>
          <Stack spacing={0}>
            <Text fontSize='2xl'>{user?.firstName + ' ' + user?.lastName}</Text>
            <Text color='gray.400' fontSize='md'>
              {user?.userName}
            </Text>
          </Stack>
          <Text color='gray.400' fontSize='md'>{`Member since ${
            date && formatDate(date)
          }`}</Text>
        </Stack>
      </HStack>
      <HStack marginTop={4}>
        {!sameUser && !isAcquaintance && (
          <>
            {friendRequest ? (
              <Button
                isLoading={isUpdating}
                onClick={cancelFriendRequest}
                leftIcon={<AiOutlineUserAdd />}
              >
                Cancel friend request
              </Button>
            ) : (
              <Button
                isLoading={isUpdating}
                onClick={sendFriendRequest}
                leftIcon={<AiOutlineUserAdd />}
              >
                Send friend request
              </Button>
            )}
            <Button leftIcon={<IoMailOutline />} onClick={handleSendMessage}>
              {`Message ${user?.firstName}`}
            </Button>
          </>
        )}
        {sameUser && (
          <Button
            marginTop={4}
            leftIcon={<AiOutlineEdit />}
            onClick={() => router.push('/settings')}
          >
            Edit Profile
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default ProfileHeader;
