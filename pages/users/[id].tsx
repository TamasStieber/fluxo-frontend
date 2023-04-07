import MainWrapper from '@/components/MainWrapper';
import PageContainer from '@/components/PageContainer';
import Profile from '@/components/Profile';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuth } from '@/utils/utils';
import { User } from '@/interfaces/interfaces';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = checkAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      fetch(`${process.env.BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
          } else {
            setUser(data.user);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, [token, id]);

  return (
    <MainWrapper>
      <PageContainer>
        <Profile user={user} />
      </PageContainer>
    </MainWrapper>
  );
};

export default UserProfile;
