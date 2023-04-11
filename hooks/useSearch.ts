import { User, Post } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useEffect, useState } from 'react';

const useSearch = (query: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPorsts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const token = checkAuth();
  useEffect(() => {
    try {
      setLoading(true);
      fetch(`${process.env.BACKEND_URL}/search/${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setUsers(data.users);
            setPorsts(data.posts);
          }
          setLoading(false);
        });
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, [query, token]);

  return { users, posts, isLoading, error };
};

export default useSearch;
