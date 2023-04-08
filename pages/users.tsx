import CreatePost from '@/components/CreatePost';
// import { TokenContext } from '@/components/MainWrapper';
import PostCard from '@/components/PostCard';
import UserCard from '@/components/UserCard';
import { Post } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

const Users = () => {
  // const token = useContext(TokenContext);
  const token = checkAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.BACKEND_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) =>
      response.json().then((data) => {
        if (data.length !== 0) {
          setUsers(data.allUsers);
          setLoading(false);
        }
      })
    );
  }, [token]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/posts`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          setPosts(data);
        }
      });
  }, []);

  if (loading && users.length === 0) return <Text>No users found</Text>;

  return (
    <>
      {/* {users.length > 0 &&
        users.map((user) => <UserCard key={user.email} user={user} />)}
      {posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
      <CreatePost /> */}
    </>
  );
};

export default Users;
