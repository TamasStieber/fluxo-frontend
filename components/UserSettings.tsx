import { UserSettingsProps } from '@/interfaces/props';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { currentUserObj, loggedInUser } from './PageContainer';
import UserAvatar from './UserAvatar';
import { checkAuth } from '@/utils/utils';

const UserSettings = ({ user }: UserSettingsProps) => {
  const userProfilePictureUrl = `${process.env.BACKEND_URL}/${loggedInUser?._id}/photos/${loggedInUser?.profilePictureUrl}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordAgainRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(loggedInUser?.firstName);
  const [lastName, setLastName] = useState(loggedInUser?.lastName);
  const [email, setEmail] = useState(loggedInUser?.email);
  const [avatar, setAvatar] = useState(userProfilePictureUrl);
  const [error, setError] = useState('');

  const toast = useToast();

  const token = checkAuth();

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
    const updateFormData = new FormData();

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    updateFormData.append('data', JSON.stringify(formData));
    updateFormData.append(
      'profilePicture',
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ''
    );

    fetch(`${process.env.BACKEND_URL}/users/${loggedInUser?._id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updateFormData,
    })
      .then((response) =>
        response.json().then((data) => {
          if (!data.error) {
            currentUserObj.set(data);
            toast({
              title: 'Profile updated successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        })
      )
      .catch((error) => console.log(error));
  };

  const passwordSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !oldPasswordRef.current?.value ||
      !newPasswordRef.current?.value ||
      !newPasswordAgainRef.current?.value
    )
      return setError('Please fill all fields!');

    if (newPasswordRef.current?.value !== newPasswordAgainRef.current?.value)
      return setError("New password fields don't match!");

    const formData = {
      oldPassword: oldPasswordRef.current?.value,
      newPassword: newPasswordRef.current?.value,
    };

    fetch(`${process.env.BACKEND_URL}/users/${loggedInUser?._id}/password`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) =>
        response.json().then((data) => {
          if (data.error) setError(data.error);
          else {
            toast({
              title: 'Password updated successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Heading>Profile Settings</Heading>
      <Divider marginY={4} />
      <Box padding={4}>
        <Heading fontSize='xl' marginBottom={4}>
          Public Settings
        </Heading>
        <form onSubmit={(event) => submitHandler(event)}>
          <Stack>
            <HStack spacing={10}>
              <Stack flexGrow={1}>
                <HStack>
                  <Stack flexGrow={1}>
                    <Text>First Name</Text>
                    <Input
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </Stack>
                  <Stack flexGrow={1}>
                    <Text>Last Name</Text>
                    <Input
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </Stack>
                </HStack>
                <Text>Email</Text>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <HStack justifyContent='flex-end'></HStack>
              </Stack>
              <Stack spacing={4} paddingX={4} alignItems='center'>
                <UserAvatar user={loggedInUser} size='2xl' url={avatar} />
                <Button onClick={openFileBrowser}>Change Avatar</Button>
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
              </Stack>
            </HStack>
            <HStack justifyContent='flex-end'>
              <Button type='submit' colorScheme='green'>
                Save
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
      <Box padding={4}>
        <Heading fontSize='xl' marginBottom={4}>
          Change Password
        </Heading>
        <form onSubmit={(event) => passwordSubmitHandler(event)}>
          <Stack>
            <Text>Old Password</Text>
            <Input ref={oldPasswordRef} type='password' />
            <Text>New Password</Text>
            <Input ref={newPasswordRef} type='password' />
            <Text>New Password Again</Text>
            <Input ref={newPasswordAgainRef} type='password' />
            <HStack justifyContent='space-between'>
              <Text color='red.400'>{error}</Text>
              <Button type='submit' colorScheme='green'>
                Save
              </Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default UserSettings;
