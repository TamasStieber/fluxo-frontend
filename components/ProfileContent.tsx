import { ProfileContentProps } from '@/interfaces/props';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Link,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { checkAuth } from '@/utils/utils';
import { Post } from '@/interfaces/interfaces';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import FriendsBox from './FriendsBox';

const ProfileContent = ({ user }: ProfileContentProps) => {
  const { currentUser } = useContext(CurrentUserContext);

  const token = checkAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const sameUser = currentUser?.email === user?.email && true;

  const subject = sameUser ? 'you' : user?.firstName;

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
    <Grid
      marginTop={4}
      templateColumns={{
        base: '1fr',
        lg: '230px auto',
      }}
    >
      <GridItem>
        <Box boxShadow='md' padding={2}>
          <FriendsBox user={user} />
        </Box>
      </GridItem>
      <GridItem>
        <Box padding={2}>
          <Text fontSize='xl'>Posts by {subject}</Text>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProfileContent;
