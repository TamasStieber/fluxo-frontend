import { User } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useEffect, useState } from 'react';

const useUser = (username: string | string[] | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const token = checkAuth();

  useEffect(() => {
    if (!username) return;
    try {
      setLoading(true);
      fetch(`${process.env.BACKEND_URL}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setUser(data.user);
          }
          setLoading(false);
        });
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, [username, token]);

  return { user, isLoading, error };
};

export default useUser;
