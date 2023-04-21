import { Conversation, IMessage, User } from '@/interfaces/interfaces';
import { Box, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { checkAuth, getCurrentUserId } from '@/utils/utils';

interface ConversationProps {
  conversation: Conversation | null;
  newPartner: User | null;
}

const Conversation = ({ conversation, newPartner }: ConversationProps) => {
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const currentUserId = getCurrentUserId();
  const token = checkAuth();

  const partner = conversation?.participants.find(
    (participant) => participant._id !== currentUserId
  );

  useEffect(() => {
    if (conversationContainerRef.current)
      conversationContainerRef.current.scrollTop =
        conversationContainerRef.current.scrollHeight;
  });

  if (newPartner)
    return (
      <Stack height={700}>
        <Heading
          marginBottom={4}
          fontSize='xl'
        >{`New conversation with ${newPartner.firstName} ${newPartner.lastName}`}</Heading>
      </Stack>
    );

  if (!conversation || !partner) return <Text>Select a conversation</Text>;

  return (
    <Stack paddingRight={2} justifyContent='space-between' height={700}>
      <Heading
        marginBottom={4}
        fontSize='xl'
      >{`Conversation with ${partner.firstName} ${partner.lastName}`}</Heading>
      <Stack
        spacing={4}
        ref={conversationContainerRef}
        overflowY='auto'
        maxHeight={700}
      >
        {conversation.messages.map((message) => (
          <Message key={message._id} message={message} partner={partner} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Conversation;
