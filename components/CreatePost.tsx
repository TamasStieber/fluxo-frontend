import { CreatePostProps } from '@/interfaces/props';
import { Stack, Button, Text, Flex } from '@chakra-ui/react';
import { ChangeEvent, useState, useContext, FormEvent } from 'react';
import AutoResizeTextarea from './AutoResizeTextarea';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

const CreatePost = ({ createPost, isCreating }: CreatePostProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const placeHolder = `What's on your mind, ${currentUser?.firstName}?`;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value !== '' && error !== '') setError('');
    setValue(event.target.value);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!currentUser) return;
    if (value === '') return setError('Oops! You forgot to fill this field!');
    const postFormData = {
      author: currentUser._id,
      content: value,
    };

    createPost(postFormData);
  };

  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <Stack>
        <AutoResizeTextarea
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
        />
        <Flex justifyContent='flex-end'>
          <Button isLoading={isCreating} type='submit' colorScheme='green'>
            Post
          </Button>
        </Flex>
      </Stack>
      <Text color='red.400'>{error}</Text>
    </form>
  );
};

export default CreatePost;
