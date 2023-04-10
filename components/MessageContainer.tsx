import { Message, User } from '@/interfaces/interfaces';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { loggedInUser } from './PageContainer';
import UserAvatar from './UserAvatar';

interface MessageContainerProps {
  message: Message;
  partner: User;
}

const MessageContainer = ({ message, partner }: MessageContainerProps) => {
  const direction =
    message.sender === loggedInUser?._id ? 'row-reverse' : 'row';
  const bgColor =
    message.sender === loggedInUser?._id ? 'blue.500' : 'green.500';
  const user = message.sender === loggedInUser?._id ? loggedInUser : partner;

  return (
    <Flex justify='flex-start' flexDirection={direction} alignItems='flex-end'>
      <UserAvatar user={user} size='sm' />
      <Text
        maxWidth='80%'
        marginX={2}
        whiteSpace='pre-wrap'
        borderRadius='10px'
        padding={2}
        bgColor={bgColor}
      >
        {message.content}
      </Text>
    </Flex>
  );
};

export default MessageContainer;
