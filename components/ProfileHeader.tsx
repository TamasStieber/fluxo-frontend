import { ProfileHeaderProps } from '@/interfaces/props';
import { Avatar, Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { AiOutlineUserAdd, AiOutlineEdit } from 'react-icons/ai';
import { loggedInUser } from './PageContainer';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/router';

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const router = useRouter();

  const date = user && new Date(user.createdAt);

  const isAcquaintance = loggedInUser?.acquaintances.find(
    (acquaintance) => acquaintance._id === user?._id
  );
  const sameUser = loggedInUser?._id === user?._id && true;

  return (
    <Box marginY={2} borderRadius='10px'>
      <HStack spacing={4}>
        <UserAvatar user={user} size='2xl' />
        <Stack spacing={4}>
          <Stack spacing={0}>
            <Text fontSize='2xl'>{user?.firstName + ' ' + user?.lastName}</Text>
            <Text color='gray.400' fontSize='lg'>
              {user?.email}
            </Text>
          </Stack>
          <Text color='gray.400' fontSize='md'>{`Member since ${
            date && date.toLocaleDateString('hu-HU')
          }`}</Text>
        </Stack>
      </HStack>
      {!sameUser && !isAcquaintance && (
        <Button marginTop={4} leftIcon={<AiOutlineUserAdd />}>
          Send friend request
        </Button>
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
    </Box>
  );
};

export default ProfileHeader;
