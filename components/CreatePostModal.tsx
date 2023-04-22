import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  HStack,
  Icon,
  Stack,
  Box,
  Text,
  Center,
  Flex,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import error from 'next/error';
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import AutoResizeTextarea from './AutoResizeTextarea';
import { HiOutlinePhoto } from 'react-icons/hi2';
import usePosts from '@/hooks/usePosts';
import { PostsContext } from '@/contexts/PostsContext';
import { CreatePostModalOptions } from '@/interfaces/props';
import PhotoPreview from './PhotoPreview';

interface CreatePostModalProps {
  options: CreatePostModalOptions;
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({
  options,
  isOpen,
  onClose,
}: CreatePostModalProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isCreating, createPost } = useContext(PostsContext);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value !== '' && error !== '') setError('');
    setValue(event.target.value);
  };

  const placeHolder = `What's on your mind, ${currentUser?.firstName}?`;

  const submitHandler = () => {
    if (!currentUser) return;
    if (!fileInputRef.current) return;
    if (value === '') return setError('Oops! You forgot to fill this field!');

    const postFormData = new FormData();

    const formData = {
      author: currentUser._id,
      content: value,
    };

    postFormData.append('data', JSON.stringify(formData));

    if (fileInputRef.current.files) {
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        postFormData.append('file', fileInputRef.current.files[i]);
      }
    }

    createPost(postFormData, handleClose);
  };

  const handleClose = () => {
    setValue('');
    setPhotos([]);
    onClose();
  };

  const openFileBrowser = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const addPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const selectedPhotos = [];
      for (let i = 0; i < event.target.files.length; i++) {
        selectedPhotos.push(event.target.files[i]);
      }
      setPhotos([...photos, ...selectedPhotos]);
    }
  };

  const handleDelete = (photoToDelete: File) => {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const dataTransfer = new DataTransfer();
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        if (fileInputRef.current.files[i].name !== photoToDelete.name)
          dataTransfer.items.add(fileInputRef.current.files[i]);
      }
      fileInputRef.current.files = dataTransfer.files;
    }
    setPhotos(photos.filter((photo) => photo.name !== photoToDelete.name));
  };

  return (
    <Modal isOpen={isOpen} size='xl' onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <Stack alignItems='flex-start'>
              <AutoResizeTextarea
                value={value}
                onChange={handleChange}
                placeholder={placeHolder}
              />
            </Stack>
            <input
              style={{ display: 'none' }}
              ref={fileInputRef}
              type='file'
              name='photo'
              id='photo'
              accept='image/*'
              multiple
              onChange={(event) => {
                addPhotos(event);
                // if (e.currentTarget.files)
                //   formik.setFieldValue('photo', e.currentTarget.files[0]);
              }}
            />
          </form>
          <Box marginTop={2}>
            <PhotoPreview photos={photos} handleDelete={handleDelete} />
            <Button
              onClick={openFileBrowser}
              colorScheme='green'
              variant='ghost'
            >
              <Icon fontSize='1.5rem' marginRight={2} as={HiOutlinePhoto} />
              Add Photos
            </Button>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} variant='ghost' onClick={handleClose}>
            Close
          </Button>
          <Button
            colorScheme='green'
            isLoading={isCreating}
            onClick={submitHandler}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
