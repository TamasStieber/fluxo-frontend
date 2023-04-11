import { Post, User } from '@/interfaces/interfaces';
import { SearchProps } from '@/interfaces/props';
import { checkAuth } from '@/utils/utils';
import {
  Box,
  Center,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import PostCard from './PostCard';
import useSearch from '@/hooks/useSearch';

const Search = ({ query }: SearchProps) => {
  const { users, posts, isLoading, error } = useSearch(query);
  // const [users, setUsers] = useState<User[]>([]);
  // const [posts, setPosts] = useState<Post[]>([]);

  // const token = checkAuth();

  // useEffect(() => {
  //   fetch(`${process.env.BACKEND_URL}/search/${query}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.error) {
  //         setUsers([]);
  //         setPosts([]);
  //       } else {
  //         setUsers(data.users);
  //         setPosts(data.posts);
  //       }
  //     });
  // }, [query, token]);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (error) return <div>An error occurred</div>;

  return (
    <Box>
      <Heading>{`Search results for ${query}`}</Heading>
      <Tabs isFitted variant='line' marginTop={4}>
        <TabList mb='1em'>
          <Tab>People</Tab>
          <Tab>Posts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {users.length > 0 &&
              users.map((user) => <UserCard key={user._id} user={user} />)}
            {users.length === 0 && (
              <Text>No people found. Try to search for someone else!</Text>
            )}
          </TabPanel>
          <TabPanel>
            {posts.length > 0 &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
            {posts.length === 0 && (
              <Text>No posts found. Try to search for something else!</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Search;
