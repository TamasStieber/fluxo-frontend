import { PageContainerProps } from '@/interfaces/props';
import NavBar from './NavBar';
import { checkAuth, getCurrentUserId } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import useConversations from '@/hooks/useConversations';
import { ConversationsContext } from '@/contexts/ConversationsContext';
import useFriendRequests from '@/hooks/useFriendRequests';
import { FriendRequestsContext } from '@/contexts/FriendRequestsContext';

const PageContainer = ({ children }: PageContainerProps) => {
  const { currentUser, isLoading, isUpdating, error, updateUser, refreshUser } =
    useCurrentUser();
  const {
    conversations,
    isLoading: isConversationsLoading,
    error: conversationsError,
    refreshConversations,
  } = useConversations();
  const {
    friendRequests,
    isLoading: isFriendRequestsLoading,
    isUpdating: isFriendRequestsUpdating,
    error: friendRequestsError,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriendRequests();

  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!checkAuth()) router.push('/login');
    else setToken(checkAuth());
  }, [router]);

  if (!token || !currentUser) return null;

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoading,
        isUpdating,
        error,
        updateUser,
        refreshUser,
      }}
    >
      <ConversationsContext.Provider
        value={{
          conversations,
          isLoading: isConversationsLoading,
          error: conversationsError,
          refreshConversations,
        }}
      >
        <FriendRequestsContext.Provider
          value={{
            friendRequests,
            isLoading: isFriendRequestsLoading,
            isUpdating: isFriendRequestsUpdating,
            error: friendRequestsError,
            sendFriendRequest,
            cancelFriendRequest,
            acceptFriendRequest,
            rejectFriendRequest,
          }}
        >
          <NavBar />
          <Box marginTop={4} padding={2} maxWidth='1000px' marginX='auto'>
            {children}
          </Box>
        </FriendRequestsContext.Provider>
      </ConversationsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default PageContainer;
