import MainWrapper from '@/components/MainWrapper';
// import PageContainer, { loggedInUser } from '@/components/PageContainer';
import { useContext, useEffect, useState, FormEvent, useRef } from 'react';
import {
  Conversation as IConversation,
  IMessage,
  User,
} from '@/interfaces/interfaces';
import { checkAuth, getCurrentUserId } from '@/utils/utils';
import UserCard from '@/components/UserCard';
import {
  Box,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Button,
} from '@chakra-ui/react';
import Conversation from '@/components/Conversation';
import ConversationPartner from '@/components/ConversationPartner';
import useConversations from '@/hooks/useConversations';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import { ConversationsContext } from '@/contexts/ConversationsContext';

const Messages = () => {
  const { conversations, isLoading, error, refreshConversations } =
    useContext(ConversationsContext);
  const { currentUser, refreshUser } = useContext(CurrentUserContext);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);
  const [newPartner, setNewPartner] = useState<User | null>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const token = checkAuth();

  const selectedPartner = selectedConversation?.participants.find(
    (participant) => participant._id !== currentUser?._id
  );

  const clearNewPartner = () => {
    setNewPartner(null);
  };

  const getConversations = async (conversationId: string) => {
    if (newPartner) clearNewPartner();
    fetch(`${process.env.BACKEND_URL}/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedConversation(data.conversation);
        refreshUser();
        refreshConversations();
      });
  };

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();

    const messageData = {
      sender: currentUser?._id,
      receiver: selectedPartner?._id || newPartner?._id,
      content: messageRef.current?.value,
    };

    fetch(`${process.env.BACKEND_URL}/messages/`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          if (newPartner) {
            setNewPartner(null);
            setSelectedConversation(data.newConversation);
            getConversations(data.newConversation._id);
          } else {
            selectedConversation && getConversations(selectedConversation._id);
          }
          if (messageRef.current) messageRef.current.value = '';
          refreshUser();
          refreshConversations();
        }
      });
  };

  useEffect(() => {
    const userToMessage = localStorage.getItem('userToMessage');
    if (!userToMessage || conversations.length === 0) return;

    const parsedUserToMessage: User = JSON.parse(userToMessage);

    const existingConversation = conversations.find((conversation) =>
      conversation.participants.some(
        (participant) => participant._id === parsedUserToMessage._id
      )
    );

    if (existingConversation) {
      fetch(`${process.env.BACKEND_URL}/messages/${existingConversation._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedConversation(data.conversation);
        });
    } else setNewPartner(parsedUserToMessage);

    localStorage.removeItem('userToMessage');
  }, [conversations, token]);

  return (
    <SimpleGrid columns={2} spacing={4} gridTemplateColumns='200px auto'>
      <Stack width={200}>
        <Heading marginBottom={4} fontSize='xl'>
          Conversations
        </Heading>
        {newPartner && (
          <Box
            fontStyle='italic'
            borderRadius='10px'
            cursor='pointer'
            _hover={{ backgroundColor: 'green.400' }}
            bgColor='green.400'
          >
            <HStack padding={2} justify='space-between'>
              <ConversationPartner user={newPartner} />
            </HStack>
          </Box>
        )}
        {conversations.map((conversation) => {
          const partner = conversation.participants.find(
            (participant) => participant.email !== currentUser?.email
          );

          const lastRead = currentUser?.lastReadMessages.find(
            (lastRead) => lastRead.conversation === conversation._id
          );
          const lastReadMessage = lastRead?.lastReadMessage;

          const isRead = lastReadMessage === conversation.lastMessage._id;

          if (partner)
            return (
              <Box
                fontWeight={isRead ? 'normal' : 'bold'}
                key={conversation._id}
                borderRadius='10px'
                cursor='pointer'
                _hover={{ backgroundColor: 'green.400' }}
                bgColor={
                  partner._id === selectedPartner?._id ? 'green.400' : 'inherit'
                }
                onClick={() => getConversations(conversation._id)}
              >
                <HStack padding={2} justify='space-between'>
                  <ConversationPartner user={partner} />
                  {!isRead && (
                    <div
                      style={{
                        backgroundColor: 'red',
                        width: '10px',
                        height: '10px',
                        borderRadius: '100%',
                      }}
                    ></div>
                  )}
                </HStack>
              </Box>
            );
        })}
      </Stack>
      <Stack>
        <Conversation
          conversation={selectedConversation}
          newPartner={newPartner}
        />
        {(selectedConversation || newPartner) && (
          <form onSubmit={(event) => handleSendMessage(event)}>
            <HStack>
              <Input ref={messageRef} placeholder='Say something nice' />
            </HStack>
            <HStack marginTop={2} justify='flex-end'>
              <Button colorScheme='green' type='submit'>
                Send
              </Button>
            </HStack>
          </form>
        )}
      </Stack>
    </SimpleGrid>
  );
};

export default Messages;
