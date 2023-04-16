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

const PageContainer = ({ children }: PageContainerProps) => {
  const { currentUser, isLoading, isUpdating, error, updateUser, refreshUser } =
    useCurrentUser();
  const {
    conversations,
    isLoading: isConversationsLoading,
    error: conversationsError,
    refreshConversations,
  } = useConversations();

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
        <NavBar />
        <Box marginTop={4} padding={2} maxWidth='1000px' marginX='auto'>
          {children}
        </Box>
      </ConversationsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default PageContainer;
