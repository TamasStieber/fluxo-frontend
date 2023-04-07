import {
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';

const RegisterForm = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState('');

  const router = useRouter();

  const handleClick = () => setShow(!show);

  const openFileBrowser = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const setAvatarThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(URL.createObjectURL(event.target.files[0] as Blob));
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const registerFormData = new FormData();

    const formData: { [key: string]: string | undefined } = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    registerFormData.append('data', JSON.stringify(formData));
    registerFormData.append(
      'profilePicture',
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ''
    );

    fetch(`${process.env.BACKEND_URL}/register`, {
      method: 'post',
      body: registerFormData,
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
      <Stack width={500} margin='auto' mt={14} textAlign='center' spacing={4}>
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
        <HStack justifyContent='center'>
          <Button onClick={openFileBrowser}>Pick an Avatar</Button>
          <Avatar size='2xl' src={avatar} />
        </HStack>
        <input
          style={{ display: 'none' }}
          ref={fileInputRef}
          type='file'
          name='photo'
          id='photo'
          accept='image/*'
          onChange={(event) => {
            setAvatarThumbnail(event);
            // if (e.currentTarget.files)
            //   formik.setFieldValue('photo', e.currentTarget.files[0]);
          }}
        />
        <Button type='submit'>Register</Button>
        <Text color='red.400'>{error}</Text>
      </Stack>
    </form>
  );
};

export default RegisterForm;
