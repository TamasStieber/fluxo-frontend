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
import usePosts from '@/hooks/usePosts';

const ProfileContent = ({ user }: ProfileContentProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { posts } = usePosts(user?._id);

  const sameUser = currentUser?.email === user?.email && true;

  const subject = sameUser ? 'you' : user?.firstName;

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
