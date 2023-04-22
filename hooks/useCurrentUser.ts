import { User } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const token = checkAuth();
  const toast = useToast();

  useEffect(() => {
    try {
      setLoading(true);
      fetch(`${process.env.BACKEND_URL}/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) setCurrentUser(data.currentUser);
          setLoading(false);
        });
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, [token, refreshTrigger]);

  const updateUser = (formData: FormData) => {
    setUpdating(true);
    fetch(`${process.env.BACKEND_URL}/users/`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) =>
        response.json().then((data) => {
          if (!data.error) {
            setCurrentUser(data);
            toast({
              title: 'Profile updated successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        })
      )
      .catch((error) => setError(error as Error))
      .finally(() => setUpdating(false));
  };

  const refreshUser = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return { currentUser, isLoading, isUpdating, error, updateUser, refreshUser };
};

export default useCurrentUser;
