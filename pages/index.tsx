import MainWrapper from '@/components/MainWrapper';
import Users from './users';
import PageContainer from '@/components/PageContainer';
import Feed from '@/components/Feed';
import CreatePost from '@/components/CreatePost';
import { Post } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useState, useEffect } from 'react';
import usePosts from '@/hooks/usePosts';
import { Box, Spinner } from '@chakra-ui/react';
import { PostsContext } from '@/contexts/PostsContext';

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
        <PostsContext.Provider
          value={{
            posts,
            isLoading,
            isCreating,
            error,
            createPost,
          }}
        >
          <Box maxWidth={700} marginX='auto'>
            <CreatePost />
            <Feed
              posts={posts}
              isLoading={isLoading}
              isUpdating={isUpdating}
              error={error}
              updatePost={updatePost}
              deletePost={deletePost}
              handleLikeClick={handleLikeClick}
            />
          </Box>
        </PostsContext.Provider>
      </PageContainer>
    </MainWrapper>
  );
};

export default Home;
