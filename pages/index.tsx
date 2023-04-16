import MainWrapper from '@/components/MainWrapper';
import Users from './users';
import PageContainer from '@/components/PageContainer';
import Feed from '@/components/Feed';
import CreatePost from '@/components/CreatePost';
import { Post } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useState, useEffect } from 'react';
import usePosts from '@/hooks/usePosts';
import { Spinner } from '@chakra-ui/react';

const Home = () => {
  const {
    posts,
    isLoading,
    isUpdating,
    isCreating,
    error,
    createPost,
    updatePost,
    deletePost,
    handleLikeClick,
  } = usePosts();

  if (isLoading) return <Spinner />;

  if (error) return <div>An error occurred</div>;

  return (
    <MainWrapper>
      <PageContainer>
        <CreatePost createPost={createPost} isCreating={isCreating} />
        <Feed posts={posts} />
      </PageContainer>
    </MainWrapper>
  );
};

export default Home;
