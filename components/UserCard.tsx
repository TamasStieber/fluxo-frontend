import { User } from '@/pages/users';
import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const date = new Date(user.createdAt);
  return (
    <Flex
      maxWidth={500}
      display='inline-flex'
      align='center'
      margin={2}
      padding={2}
      borderRadius='10px'
      backgroundColor='gray.700'
    >
      <Avatar
        size='lg'
        mr={4}
        name={`${user.firstName} ${user.lastName}`}
        src='https://bit.ly/dan-abramov'
      />
      <Stack spacing={0}>
        <Text fontSize='2xl'>{user.firstName + ' ' + user.lastName}</Text>
        <Text color='gray.400' fontSize='lg'>
          {user.email}
        </Text>
        <Text
          color='gray.400'
          fontSize='md'
        >{`Member since ${date.toLocaleDateString('hu-HU')}`}</Text>
      </Stack>
    </Flex>
  );
};

export default UserCard;
