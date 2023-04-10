import { User } from '@/interfaces/interfaces';
import { HStack, Stack, Button, Text } from '@chakra-ui/react';
import React from 'react';
import UserAvatar from './UserAvatar';

interface ConversationPartnerProps {
  user: User;
}

const ConversationPartner = ({ user }: ConversationPartnerProps) => {
  return (
    <HStack padding={2}>
      <UserAvatar user={user} size='sm' />
      <Text fontWeight='bold'>{user.firstName + ' ' + user.lastName}</Text>
    </HStack>
  );
};

export default ConversationPartner;
