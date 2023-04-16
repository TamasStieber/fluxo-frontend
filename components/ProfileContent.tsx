import { ProfileContentProps } from '@/interfaces/props';
import { Box, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { checkAuth } from '@/utils/utils';
import { Post } from '@/interfaces/interfaces';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

const ProfileContent = ({ user }: ProfileContentProps) => {
  const { currentUser } = useContext(CurrentUserContext);

  const token = checkAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const subject = currentUser?._id === user?._id ? 'you' : user?.firstName;

  useEffect(() => {
    if (!user) return;

    if (token) {
      fetch(`${process.env.BACKEND_URL}/users/${user._id}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then((response) =>
        response.json().then((data) => {
          if (data.error) {
          } else setPosts(data.posts);
        })
      );
    }
  }, [token, user]);

  return (
    <Box marginTop={4}>
      <Text fontSize='xl'>Posts by {subject}</Text>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default ProfileContent;
