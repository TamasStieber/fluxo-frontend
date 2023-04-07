import { Post } from '@/interfaces/interfaces';
import { PostCardProps } from '@/interfaces/props';
import { getCurrentUserId } from '@/utils/utils';
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
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Likes from './Likes';
import { useRouter } from 'next/router';

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();
  const currentUserId = getCurrentUserId();
  const date = new Date(post.createdAt);

  const redirectToProfile = () => {
    router.push(`/users/${post.author._id}`);
  };

  return (
    <Box shadow='md' borderRadius='10px' padding={2} marginY={2}>
      <HStack justifyContent='space-between' alignItems='flex-start'>
        <HStack>
          <Avatar
            name={`${post.author.firstName} ${post.author.lastName}`}
            src=''
          />
          <Stack spacing={0}>
            <Button
              fontWeight='bold'
              variant='link'
              onClick={redirectToProfile}
            >{`${post.author.firstName} ${post.author.lastName}`}</Button>
            <Text fontSize='xs'>{date.toLocaleDateString('hu-HU')}</Text>
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
