import MainWrapper from '@/components/MainWrapper';
import PageContainer, { loggedInUser } from '@/components/PageContainer';
import UserSettings from '@/components/UserSettings';
import React from 'react';

const SettingsPage = () => {
  return (
    <MainWrapper>
      <PageContainer>
        <UserSettings user={loggedInUser} />
      </PageContainer>
    </MainWrapper>
  );
};

export default SettingsPage;
