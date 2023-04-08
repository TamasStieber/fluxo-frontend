import MainWrapper from '@/components/MainWrapper';
import Users from './users';
import PageContainer from '@/components/PageContainer';
import Feed from '@/components/Feed';
import CreatePost from '@/components/CreatePost';
import { Post } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useState, useEffect } from 'react';

const Home = () => {
  const token = checkAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const updatePosts = (post: Post) => {
    setPosts([post, ...posts]);
  };

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          if (JSON.stringify(data) !== JSON.stringify(posts)) setPosts(data);
        }
      });
  }, [token, posts]);

  return (
    <MainWrapper>
      <PageContainer>
        <CreatePost updatePosts={updatePosts} />

        <Feed posts={posts} />
      </PageContainer>
    </MainWrapper>
  );
};

export default Home;
