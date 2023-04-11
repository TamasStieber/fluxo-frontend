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
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import UserAvatar from './UserAvatar';
import { checkAuth } from '@/utils/utils';
import useCurrentUser from '@/hooks/useCurrentUser';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

const UserSettings = ({ user }: UserSettingsProps) => {
  const { currentUser, isLoading, isUpdating, error, updateUser } =
    useContext(CurrentUserContext);
  const userProfilePictureUrl = `${process.env.BACKEND_URL}/${currentUser?.photosFolder}/${currentUser?.profilePictureUrl}`;
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordAgainRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(userProfilePictureUrl);
  const [validationError, setValidationError] = useState('');

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
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
    };

    updateFormData.append('data', JSON.stringify(formData));
    updateFormData.append(
      'profilePicture',
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ''
    );

    updateUser(updateFormData);
  };

  const passwordSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !oldPasswordRef.current?.value ||
      !newPasswordRef.current?.value ||
      !newPasswordAgainRef.current?.value
    )
      return setValidationError('Please fill all fields!');

    if (newPasswordRef.current?.value !== newPasswordAgainRef.current?.value)
      return setValidationError("New password fields don't match!");

    const formData = {
      oldPassword: oldPasswordRef.current?.value,
      newPassword: newPasswordRef.current?.value,
    };

    fetch(`${process.env.BACKEND_URL}/users/password`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) =>
        response.json().then((data) => {
          if (data.error) setValidationError(data.error);
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
                      ref={firstNameRef}
                      defaultValue={currentUser?.firstName}
                    />
                  </Stack>
                  <Stack flexGrow={1}>
                    <Text>Last Name</Text>
                    <Input
                      ref={lastNameRef}
                      defaultValue={currentUser?.lastName}
                    />
                  </Stack>
                </HStack>
                <Text>Email</Text>
                <Input ref={emailRef} defaultValue={currentUser?.email} />
                <HStack justifyContent='flex-end'></HStack>
              </Stack>
              <Stack spacing={4} paddingX={4} alignItems='center'>
                <UserAvatar user={currentUser} size='2xl' url={avatar} />
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
              <Button isLoading={isUpdating} type='submit' colorScheme='green'>
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
              <Text color='red.400'>{validationError}</Text>
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
