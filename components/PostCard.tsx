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
  Icon,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { RxDotFilled } from 'react-icons/rx';
import Likes from './Likes';
import { useRouter } from 'next/router';
import UserAvatar from './UserAvatar';
import { loggedInUser } from './PageContainer';
import FormattedPostContent from './FormattedPostContent';

const PostCard = ({ post }: PostCardProps) => {
  const creationDate = new Date(post.createdAt);
  const [timeAgo, setTimeAgo] = useState(calculatePassedTime(creationDate));
  const router = useRouter();
  const currentUserId = getCurrentUserId();
  const isEdited = post.createdAt !== post.updatedAt;

  const postContentLength = 200;

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
            <HStack spacing={0}>
              <Text fontSize='xs'>{timeAgo}</Text>
              {isEdited && (
                <>
                  <Icon color='gray.400' as={RxDotFilled} />
                  <Text fontSize='xs'>Edited</Text>
                </>
              )}
            </HStack>
          </Stack>
        </HStack>
        <HStack spacing={0}>
          {currentUserId === post.author._id && (
            <IconButton
              variant='ghost'
              aria-label='Messages'
              icon={<AiOutlineEdit fontSize='1.2rem' />}
            />
          )}
          {currentUserId === post.author._id && (
            <IconButton
              variant='ghost'
              aria-label='Messages'
              icon={<AiOutlineDelete fontSize='1.2rem' />}
            />
          )}
        </HStack>
      </HStack>
      <FormattedPostContent length={postContentLength} post={post} />
      <Likes currentUserId={currentUserId} post={post} />
    </Box>
  );
};

export default PostCard;
