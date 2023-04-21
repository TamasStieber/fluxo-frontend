import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
  useState,
} from 'react';
import UserAvatar from './UserAvatar';
import { Comment } from '@/interfaces/interfaces';
import { calculatePassedTime, redirectToProfile } from '@/utils/utils';
import useReplies from '@/hooks/useReplies';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import TextWithLinks from './TextWithLinks';
import { PostContext } from '@/contexts/PostContext';

interface CommentProps {
  comment: Comment;
}

const Comment = ({ comment }: CommentProps) => {
  const { replies, skip, postReply, loadMoreReplies } = useReplies(comment._id);
  const { currentUser } = useContext(CurrentUserContext);
  const { post } = useContext(PostContext);
  const [show, setShow] = useState(false);
  const [reply, setReply] = useState('');

  const bg = useColorModeValue('gray.50', 'gray.700');

  const textBoxBg = document.body
    ? window.getComputedStyle(document.body).backgroundColor
    : 'none';

  const isCurrentUserAuthor = currentUser?._id === comment.author._id;

  const submitReply = (event: FormEvent) => {
    event.preventDefault();

    if (currentUser) {
      setShow(false);
      setReply('');
      postReply(comment.post, currentUser._id, reply);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReply(event.target.value);
  };

  const date = new Date(comment.createdAt);

  return (
    <>
      <HStack alignItems='flex-start' padding={2}>
        <UserAvatar user={comment.author} size='sm' />
        <Box
          flexGrow={1}
          backgroundColor={bg}
          borderRadius='10px'
          paddingX={2}
          paddingY={1}
        >
          <HStack alignItems='baseline'>
            <Button
              variant='link'
              width='auto'
              colorScheme={isCurrentUserAuthor ? 'green' : 'gray'}
              onClick={() => redirectToProfile(comment.author.userName)}
            >
              {comment.author.fullName}
            </Button>
            {comment.author._id === post?.author._id && (
              <Text fontWeight='bold' fontSize='sm' textColor='blue.500'>
                OP
              </Text>
            )}
          </HStack>
          <Text fontSize='xs'>{calculatePassedTime(date)}</Text>
          <Text marginY={2}>
            <TextWithLinks text={comment.content} />
          </Text>
          <HStack display={show ? 'none' : 'flex'} justifyContent='flex-start'>
            <Button
              size='sm'
              variant='link'
              colorScheme='blue'
              onClick={() => setShow(true)}
            >
              Reply
            </Button>
          </HStack>
          <Box display={show ? 'block' : 'none'}>
            <form onSubmit={(event) => submitReply(event)}>
              <HStack>
                <Input
                  value={reply}
                  onChange={handleChange}
                  backgroundColor={textBoxBg}
                  size='sm'
                  placeholder='Write your reply'
                ></Input>
                <Button colorScheme='green' type='submit' size='sm'>
                  Reply
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      </HStack>
      <Box marginLeft={4}>
        {replies.map((reply) => (
          <Comment key={reply._id} comment={reply} />
        ))}
        {comment.repliesCount > skip && (
          <Button
            size='sm'
            variant='link'
            colorScheme='blue'
            onClick={loadMoreReplies}
          >
            Load more replies
          </Button>
        )}
      </Box>
    </>
  );
};

export default Comment;
