import { Conversation } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useEffect, useState } from 'react';

const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const token = checkAuth();

  useEffect(() => {
    try {
      setLoading(true);
      fetch(`${process.env.BACKEND_URL}/messages/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) setConversations(data.conversations);
          setLoading(false);
        });
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, [token, refreshTrigger]);

  const refreshConversations = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return { conversations, isLoading, error, refreshConversations };
};

export default useConversations;
