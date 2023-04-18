import { ProfileHeaderProps } from '@/interfaces/props';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  AiOutlineUserAdd,
  AiOutlineEdit,
  AiOutlineUserDelete,
} from 'react-icons/ai';
import { IoMailOutline } from 'react-icons/io5';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/router';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { checkAuth, formatDate, redirectToProfile } from '@/utils/utils';
import useFriendRequests from '@/hooks/useFriendRequests';
import ProfileHeaderFriendRequests from './ProfileHeaderFriendRequests';
import { FriendRequestsContext } from '@/contexts/FriendRequestsContext';

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  const date = user && new Date(user.createdAt);

  const isAcquaintance = currentUser?.acquaintances.find(
    (acquaintance) => acquaintance === user?._id
  );
  const sameUser = currentUser?.email === user?.email && true;

  const handleSendMessage = () => {
    localStorage.setItem('userToMessage', JSON.stringify(user));
    router.push('/messages');
  };

  if (!user) return null;

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
      <VStack marginTop={4} align='flex-start'>
        {!sameUser && !isAcquaintance && (
          <ProfileHeaderFriendRequests user={user} />
        )}
        {!sameUser && (
          <Button leftIcon={<IoMailOutline />} onClick={handleSendMessage}>
            {`Message ${user?.firstName}`}
          </Button>
        )}
        {sameUser && (
          <Button
            leftIcon={<AiOutlineEdit />}
            onClick={() => router.push('/settings')}
          >
            Edit Profile
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default ProfileHeader;
