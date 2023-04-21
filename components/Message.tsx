import { IMessage, User } from '@/interfaces/interfaces';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import UserAvatar from './UserAvatar';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import TextWithLinks from './TextWithLinks';

interface MessageProps {
  message: IMessage;
  partner: User;
}

const Message = ({ message, partner }: MessageProps) => {
  const { currentUser } = useContext(CurrentUserContext);

  const currentUserBg = useColorModeValue('green.200', 'green.800');
  const partnerBg = useColorModeValue('gray.100', 'gray.700');

  const direction = message.sender === currentUser?._id ? 'row-reverse' : 'row';
  const bgColor =
    message.sender === currentUser?._id ? currentUserBg : partnerBg;

  const user = message.sender === currentUser?._id ? currentUser : partner;

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
        <TextWithLinks text={message.content} />
      </Text>
    </Flex>
  );
};

export default Message;
