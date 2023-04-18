import { ConversationsContext } from '@/contexts/ConversationsContext';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import { logout, getCurrentUserId } from '@/utils/utils';
import { Button, Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';

const MessagesButton = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { conversations } = useContext(ConversationsContext);
  const router = useRouter();

  const backgroundColor = document.body
    ? window.getComputedStyle(document.body).backgroundColor
    : 'none';

  let unreadCount = 0;

  const redirectToMessages = () => {
    router.push(`/messages`);
  };

  for (const conversation of conversations) {
    const partner = conversation.participants.find(
      (participant) => participant.email !== currentUser?.email
    );
    const lastRead = currentUser?.lastReadMessages.find(
      (lastRead) => lastRead.conversation === conversation._id
    );
    const lastReadMessage = lastRead?.lastReadMessage;
    if (lastReadMessage !== conversation.lastMessage._id) unreadCount++;
  }

  return (
    // <div style={{ position: 'relative' }}>
    //   <IconButton
    //     variant='ghost'
    //     aria-label='Messages'
    //     icon={<IoMailOutline fontSize='1.5rem' />}
    //     onClick={redirectToMessages}
    //   />
    //   {unreadCount > 0 && (
    //     <div
    //       style={{
    //         position: 'absolute',
    //         top: '5px',
    //         right: '5px',
    //         boxSizing: 'content-box',
    //         width: '7px',
    //         height: '7px',
    //         borderRadius: '100%',
    //         border: '3px solid',
    //         borderColor: backgroundColor,
    //         backgroundColor: 'red',
    //       }}
    //     ></div>
    //   )}
    // </div>
    <Button
      variant='ghost'
      position='relative'
      onClick={redirectToMessages}
      _hover={{ backgroundColor: 'transparent' }}
    >
      <Icon as={IoMailOutline} fontSize='1.5rem' />
      {unreadCount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            boxSizing: 'content-box',
            width: '7px',
            height: '7px',
            borderRadius: '100%',
            border: '3px solid',
            borderColor: backgroundColor,
            backgroundColor: 'red',
          }}
        ></div>
      )}
    </Button>
  );
};

export default MessagesButton;
