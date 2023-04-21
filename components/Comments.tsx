import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import useComments from '@/hooks/useComments';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useRef, useContext } from 'react';
import Comment from './Comment';
import { BiComment } from 'react-icons/bi';

interface CommentsProps {
  postId: string;
  commentsCount: number;
}

const Comments = ({ postId, commentsCount }: CommentsProps) => {
  const { comments, count, skip, postComment, loadMoreComments } =
    useComments(postId);
  const { currentUser } = useContext(CurrentUserContext);
  const commentRef = useRef<HTMLInputElement>(null);

  const submitComment = (event: FormEvent) => {
    event.preventDefault();

    if (currentUser && commentRef.current)
      postComment(postId, currentUser._id, commentRef.current.value);
  };

  return (
    <>
      <Accordion allowMultiple border='transparent'>
        <AccordionItem>
          <Flex justifyContent='center'>
            <Button
              as={AccordionButton}
              variant='ghost'
              width='auto'
              leftIcon={<BiComment />}
            >
              {`Comments (${count})`}
            </Button>
          </Flex>
          <AccordionPanel padding={0}>
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
                <Input
                  ref={commentRef}
                  placeholder='Write your comment'
                ></Input>
                <Button colorScheme='green' type='submit'>
                  Comment
                </Button>
              </HStack>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Comments;
