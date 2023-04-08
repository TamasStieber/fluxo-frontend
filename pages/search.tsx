import MainWrapper from '@/components/MainWrapper';
import PageContainer, { loggedInUser } from '@/components/PageContainer';
import Search from '@/components/Search';
import UserSettings from '@/components/UserSettings';
import { useRouter } from 'next/router';
import React from 'react';

const SearchPage = () => {
  const router = useRouter();
  return (
    <MainWrapper>
      <PageContainer>
        <Search query={router.query.q} />
      </PageContainer>
    </MainWrapper>
  );
};

export default SearchPage;
