import MainWrapper from '@/components/MainWrapper';
import PageContainer from '@/components/PageContainer';
import React from 'react';
import Messages from '@/components/Messages';

const MessagesPage = () => {
  return (
    <MainWrapper>
      <PageContainer>
        <Messages />
      </PageContainer>
    </MainWrapper>
  );
};

export default MessagesPage;
