import { UserCardProps } from '@/interfaces/props';
import { Avatar, Button, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/router';

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();
  const date = new Date(user.createdAt);

  const handleClick = () => {
    router.push(`/users/${user._id}`);
  };

  return (
    <HStack marginY={4}>
      <UserAvatar user={user} size='lg' />
      <Stack spacing={0} alignItems='flex-start'>
        <Button variant='link' fontSize='xl' onClick={handleClick}>
          {user.firstName + ' ' + user.lastName}
        </Button>
        <Text color='gray.400' fontSize='lg'>
          {user.email}
        </Text>
        <Text
          color='gray.400'
          fontSize='md'
        >{`Member since ${date.toLocaleDateString('hu-HU')}`}</Text>
      </Stack>
    </HStack>
  );
};

export default UserCard;
