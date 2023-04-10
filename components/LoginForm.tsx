import { checkAuth } from '@/utils/utils';
import {
  Button,
  ChakraProvider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useEffect, useRef, useState } from 'react';

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleClick = () => setShow(!show);

  const handleRegisterButtonClick = () => {
    router.push('/register');
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginFormData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(loginFormData),
    })
      .then((response) =>
        response.json().then((data) => {
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);

          if (data.error) setError(data.error);
          if (data.token) {
            setCookie(null, 'token', data.token, {
              maxAge: 60 * 60 * 24,
              expires,
              path: '/',
            });
            setCookie(null, 'userId', data.userId, {
              maxAge: 60 * 60 * 24,
              expires,
              path: '/',
            });
            router.push('/');
          } else {
            // setError('Login failed');
          }
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <Stack width={500} margin='auto' mt={14} textAlign='center'>
        <Input ref={emailRef} placeholder='E-mail' type='email' />
        <InputGroup size='md'>
          <Input
            ref={passwordRef}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <HStack justifyContent='center'>
          <Button type='submit'>Login</Button>
          <Button variant='outline' onClick={handleRegisterButtonClick}>
            Register
          </Button>
        </HStack>
        <Text color='red.400'>{error}</Text>
      </Stack>
    </form>
  );
};

export default LoginForm;
