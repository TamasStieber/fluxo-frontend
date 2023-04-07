import {
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const RegisterForm = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const handleClick = () => setShow(!show);

  const router = useRouter();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const registerFormData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    fetch(`${process.env.BACKEND_URL}/register`, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(registerFormData),
    })
      .then((response) =>
        response.json().then((data) => {
          if (data.error) setError(data.error);
          else router.push('/login');
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <Stack width={500} margin='auto' mt={14} textAlign='center'>
        <Input ref={firstNameRef} placeholder='First Name' />
        <Input ref={lastNameRef} placeholder='Last Name' />
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
        {/* <Input ref={dateRef} type='date' /> */}
        <Button type='submit'>Register</Button>
        <Text color='red.400'>{error}</Text>
      </Stack>
    </form>
  );
};

export default RegisterForm;
