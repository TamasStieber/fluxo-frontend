import { Post } from '@/interfaces/interfaces';
import { PostCardProps } from '@/interfaces/props';
import {
  calculatePassedTime,
  checkAuth,
  getCurrentUserId,
} from '@/utils/utils';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FormEvent, useRef, useState } from 'react';
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
  const [isHidden, setHidden] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);
  const [editMode, setEditMode] = useState(false);
  const contentEditRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const currentUserId = getCurrentUserId();
  const isEdited = currentPost.contentUpdated && true;
  const token = checkAuth();

  const postContentLength = 200;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const redirectToProfile = () => {
    router.push(`/users/${post.author._id}`);
  };

  setInterval(() => {
    setTimeAgo(calculatePassedTime(creationDate));
  }, 1000 * 60);

  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();

    const formData = { content: contentEditRef.current?.value };

    fetch(`${process.env.BACKEND_URL}/posts/${post._id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) console.error(data.error);
        else {
          setCurrentPost(data.updatedPost);
          setEditMode(false);
          onClose();
        }
      });
  };

  const handleDelete = () => {
    fetch(`${process.env.BACKEND_URL}/posts/${post._id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) console.error(data.error);
        else setHidden(true);
      });
  };

  const handleClickEvent = (event: MouseEvent) => {
    // console.log(editMode);
    // document.removeEventListener('click', handleClickEvent);
    // if (editMode && event.target !== contentEditRef.current) {
    //   setEditMode(!editMode);
    // }
  };

  document.addEventListener('click', handleClickEvent);
  // if (editMode && event.target !== contentEditRef.current)
  // setEditMode(!editMode);
  // this.removeEventListener('click', this)

  return (
    <>
      <Box
        shadow='md'
        borderRadius='10px'
        padding={2}
        marginY={2}
        display={isHidden ? 'none' : 'block'}
      >
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
                aria-label='Edit Post'
                _hover={{ color: 'blue.400' }}
                icon={<AiOutlineEdit fontSize='1.2rem' />}
                onClick={() => setEditMode(!editMode)}
              />
            )}
            {currentUserId === post.author._id && (
              <IconButton
                variant='ghost'
                aria-label='Delete Post'
                _hover={{ color: 'red.400' }}
                icon={<AiOutlineDelete fontSize='1.2rem' />}
                onClick={onOpen}
              />
            )}
          </HStack>
        </HStack>
        {editMode ? (
          <form onSubmit={(event) => handleUpdate(event)}>
            <Input
              ref={contentEditRef}
              defaultValue={post.content}
              autoFocus={editMode}
            />
          </form>
        ) : (
          <FormattedPostContent
            length={postContentLength}
            content={currentPost.content}
          />
        )}
        <Likes currentUserId={currentUserId} post={post} />
      </Box>
      <OnDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        deleteHandler={handleDelete}
      />
    </>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteHandler: () => void;
}

const OnDeleteModal = ({ isOpen, onClose, deleteHandler }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Do you really want to delete this post?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='red'
            mr={3}
            onClick={() => {
              deleteHandler();
              onClose();
            }}
          >
            Delete
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostCard;
