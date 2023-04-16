import MainWrapper from '@/components/MainWrapper';
import PageContainer from '@/components/PageContainer';
import Profile from '@/components/Profile';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuth } from '@/utils/utils';
import { User } from '@/interfaces/interfaces';
import useUser from '@/hooks/useUser';
import { Center, Spinner } from '@chakra-ui/react';

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user, isLoading, error } = useUser(username);
  // const token = checkAuth();
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   if (!username) return;
  //   try {
  //     fetch(`${process.env.BACKEND_URL}/users/${username}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.error) {
  //         } else {
  //           setUser(data.user);
  //         }
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [token, username]);

  // console.log(user);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (error) return <div>An error occurred</div>;

  return (
    <MainWrapper>
      <PageContainer>
        <Profile user={user} />
      </PageContainer>
    </MainWrapper>
  );
};

export default UserProfile;
