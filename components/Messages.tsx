import MainWrapper from '@/components/MainWrapper';
import PageContainer, { loggedInUser } from '@/components/PageContainer';
import React, { useEffect, useState } from 'react';
import {
  Conversation as IConversation,
  Message,
  User,
} from '@/interfaces/interfaces';
import { checkAuth, getCurrentUserId } from '@/utils/utils';
import UserCard from '@/components/UserCard';
import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Conversation from '@/components/Conversation';
import ConversationPartner from '@/components/ConversationPartner';

const Messages = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);
  const [currentUser, setCurrentUser] = useState(loggedInUser);

  const currentUserId = getCurrentUserId();
  const token = checkAuth();

  const selectedPartner = selectedConversation?.participants.find(
    (participant) => participant._id !== currentUserId
  );

  const getMessages = async (conversationId: string) => {
    fetch(`${process.env.BACKEND_URL}/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setSelectedConversation(data.conversation));
  };

  useEffect(() => {
    const getCurrentUser = () => {
      fetch(`${process.env.BACKEND_URL}/users/${currentUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setCurrentUser(data.user));
    };

    const getConversations = () => {
      fetch(`${process.env.BACKEND_URL}/messages/user/${currentUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setConversations(data.conversations));
    };

    getCurrentUser();
    getConversations();
  }, [currentUserId, token, selectedConversation]);

  return (
    <SimpleGrid columns={2} spacing={4} gridTemplateColumns='200px auto'>
      <Stack width={200}>
        <Heading marginBottom={4} fontSize='xl'>
          Conversations
        </Heading>
        {conversations.map((conversation) => {
          const partner = conversation.participants.find(
            (participant) => participant._id !== currentUserId
          );

          const lastRead = currentUser?.lastReadMessages.find(
            (lastRead) => lastRead.conversation === conversation._id
          );
          const lastReadMessage = lastRead?.lastReadMessage;

          const isRead = lastReadMessage === conversation.lastMessage._id;

          if (partner)
            return (
              <Box
                color={isRead ? 'inherit' : 'red.400'}
                key={conversation._id}
                borderRadius='10px'
                cursor='pointer'
                _hover={{ backgroundColor: 'green.400' }}
                bgColor={
                  partner._id === selectedPartner?._id ? 'green.400' : 'inherit'
                }
                onClick={() => getMessages(conversation._id)}
              >
                <ConversationPartner user={partner} />
              </Box>
            );
        })}
      </Stack>
      <Conversation conversation={selectedConversation} />
    </SimpleGrid>
  );
};

export default Messages;
