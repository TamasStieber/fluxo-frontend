import { Post } from '@/interfaces/interfaces';
import { PostCardProps } from '@/interfaces/props';
import { calculatePassedTime, getCurrentUserId } from '@/utils/utils';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Likes from './Likes';
import { useRouter } from 'next/router';
import UserAvatar from './UserAvatar';
import { loggedInUser } from './PageContainer';

const PostCard = ({ post }: PostCardProps) => {
  const creationDate = new Date(post.createdAt);
  const [timeAgo, setTimeAgo] = useState(calculatePassedTime(creationDate));
  const router = useRouter();
  const currentUserId = getCurrentUserId();

  const redirectToProfile = () => {
    router.push(`/users/${post.author._id}`);
  };

  setInterval(() => {
    setTimeAgo(calculatePassedTime(creationDate));
  }, 1000 * 60);

  return (
    <Box shadow='md' borderRadius='10px' padding={2} marginY={2}>
      <HStack justifyContent='space-between' alignItems='flex-start'>
        <HStack>
          <UserAvatar user={post.author} />
          <Stack spacing={0} alignItems='flex-start'>
            <Button
              fontWeight='bold'
              variant='link'
              onClick={redirectToProfile}
            >{`${post.author.firstName} ${post.author.lastName}`}</Button>
            <Text fontSize='xs'>{timeAgo}</Text>
          </Stack>
        </HStack>
        {currentUserId === post.author._id && <Text>Edit</Text>}
      </HStack>
      <Text marginTop={4}>{post.content}</Text>
      <Likes currentUserId={currentUserId} post={post} />
    </Box>
  );
};

export default PostCard;
