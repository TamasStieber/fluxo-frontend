import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import useComments from '@/hooks/useComments';
import { Box, Button, Collapse, Flex, HStack, Input } from '@chakra-ui/react';
import { FormEvent, useRef, useContext, useState } from 'react';
import Comment from './Comment';
import { BiComment, BiShare } from 'react-icons/bi';

interface CommentsProps {
  postId: string;
  commentsCount: number;
}

const Comments = ({ postId, commentsCount }: CommentsProps) => {
  const { comments, count, skip, postComment, loadMoreComments } =
    useComments(postId);
  const { currentUser } = useContext(CurrentUserContext);
  const commentRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  const handleToggleComments = () => setShow(!show);

  const submitComment = (event: FormEvent) => {
    event.preventDefault();

    if (currentUser && commentRef.current)
      postComment(postId, currentUser._id, commentRef.current.value);
  };

  return (
    <>
      <Flex justifyContent='space-evenly'>
        <Button
          onClick={handleToggleComments}
          variant='ghost'
          width='auto'
          leftIcon={<BiComment />}
        >
          {`Comments (${count})`}
        </Button>
        <Button variant='ghost' width='auto' leftIcon={<BiShare />}>
          Share
        </Button>
      </Flex>
      <Collapse in={show}>
        <Box marginBottom={2}>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
          {commentsCount > skip && (
            <Button
              variant='link'
              colorScheme='blue'
              onClick={loadMoreComments}
            >
              Load more comments
            </Button>
          )}
        </Box>
        <form onSubmit={(event) => submitComment(event)}>
          <HStack>
            <Input ref={commentRef} placeholder='Write your comment'></Input>
            <Button colorScheme='green' type='submit'>
              Comment
            </Button>
          </HStack>
        </form>
      </Collapse>
    </>
  );
};

export default Comments;
