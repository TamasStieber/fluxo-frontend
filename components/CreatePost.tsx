import {
  Button,
  Text,
  Box,
  HStack,
  Divider,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import UserAvatar from './UserAvatar';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaRegLaughBeam } from 'react-icons/fa';
import CreatePostModal from './CreatePostModal';
import { CreatePostModalOptions } from '@/interfaces/props';

const CreatePost = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [options, setOptions] = useState<CreatePostModalOptions>(
    CreatePostModalOptions.Text
  );

  const placeHolder = `What's on your mind, ${currentUser?.firstName}?`;

  const openWithText = () => {
    setOptions(CreatePostModalOptions.Text);
    onOpen();
  };

  const openWithPhotos = () => {
    setOptions(CreatePostModalOptions.Photos);
    onOpen();
  };

  return (
    <>
      <Box marginTop={4} marginBottom={6}>
        <HStack>
          <UserAvatar user={currentUser} size='md' />
          <Box
            flexGrow={1}
            borderRadius='20px'
            padding={2}
            backgroundColor='gray.100'
            onClick={openWithText}
          >
            <Text fontSize='xl' textColor='gray.500'>
              {placeHolder}
            </Text>
          </Box>
        </HStack>
        <Divider marginY={2} />
        <HStack justifyContent='space-evenly'>
          <Button colorScheme='green' variant='ghost' onClick={openWithPhotos}>
            <Icon fontSize='1.5rem' marginRight={2} as={HiOutlinePhoto} />
            Photos
          </Button>
          <Button colorScheme='blue' variant='ghost'>
            <Icon fontSize='1.5rem' marginRight={2} as={AiOutlineUserAdd} />
            Tag Friends
          </Button>
          <Button colorScheme='orange' variant='ghost'>
            <Icon fontSize='1.5rem' marginRight={2} as={FaRegLaughBeam} />
            Feeling/Activity
          </Button>
        </HStack>
      </Box>
      <CreatePostModal options={options} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CreatePost;
