import { CreatePostProps } from '@/interfaces/props';
import { checkAuth, getCurrentUserId } from '@/utils/utils';
import {
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  HStack,
  Box,
  Flex,
  Center,
} from '@chakra-ui/react';
import error from 'next/error';
import React, { ChangeEvent, useRef, useState } from 'react';
import { loggedInUser } from './PageContainer';

const CreatePost = ({ updatePosts }: CreatePostProps) => {
  const token = checkAuth();
  const contentRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [value, setValue] = React.useState('');

  const placeHolder = `What's on your mind, ${
    loggedInUser ? loggedInUser.firstName : ''
  }?`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '' && error !== '') setError('');
    setValue(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (value === '') return setError('Oops! You forgot to fill this field!');
    const postFormData = {
      content: contentRef.current?.value,
      author: getCurrentUserId(),
    };

    fetch(`${process.env.BACKEND_URL}/posts`, {
      method: 'post',

      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(postFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setValue('');
          updatePosts(data);
        }
      })

      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <HStack>
        <Input
          ref={contentRef}
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
        />
        <Button type='submit' colorScheme='green'>
          Post
        </Button>
      </HStack>
      <Text color='red.400'>{error}</Text>
    </form>
  );
};

export default CreatePost;
