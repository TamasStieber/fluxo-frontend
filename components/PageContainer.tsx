import { PageContainerProps } from '@/interfaces/props';
import NavBar from './NavBar';
import { checkAuth, getCurrentUserId } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { User } from '@/interfaces/interfaces';
import useCurrentUser from '@/hooks/useCurrentUser';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

// export let loggedInUser: User | null = null;
// export const currentUserObj = {
//   set: (user: User) => {},
// };

const PageContainer = ({ children }: PageContainerProps) => {
  const { currentUser, isLoading, isUpdating, error, updateUser } =
    useCurrentUser();

  const router = useRouter();
  const [token, setToken] = useState('');
  // const [currentUser, setCurrentUser] = useState<User | null>(null);

  const currentUserId = getCurrentUserId();

  // currentUserObj.set = (user: User) => setCurrentUser(user);

  // loggedInUser = currentUser;

  // useEffect(() => {
  //   if (token) {
  //     fetch(`${process.env.BACKEND_URL}/users/${currentUserId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     }).then((response) =>
  //       response.json().then((data) => {
  //         if (data.length !== 0) {
  //           setCurrentUser(data.user);
  //         }
  //       })
  //     );
  //   }
  // }, [currentUserId, token]);

  useEffect(() => {
    if (!checkAuth()) router.push('/login');
  }, [router]);

  useEffect(() => {
    setToken(checkAuth());
  }, []);

  if (!token || !currentUser) return null;

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoading, isUpdating, error, updateUser }}
    >
      <NavBar />
      <Box marginTop={4} padding={2} maxWidth='1000px' marginX='auto'>
        {children}
      </Box>
    </CurrentUserContext.Provider>
  );
};

export default PageContainer;
