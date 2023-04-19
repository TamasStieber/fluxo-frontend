import { User, Post } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useEffect, useState } from 'react';

const useAcquaintances = (userId: string | undefined) => {
  const [acquaintances, setAcquaintances] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const token = checkAuth();
  useEffect(() => {
    if (!userId) return;
    try {
      setLoading(true);
      fetch(`${process.env.BACKEND_URL}/users/${userId}/acquaintances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setAcquaintances(data.acquaintances);
          }
          setLoading(false);
        });
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, [token, userId]);

  const firstSixFriends = acquaintances.slice(0, 6);

  return { acquaintances, firstSixFriends, isLoading, error };
};

export default useAcquaintances;
