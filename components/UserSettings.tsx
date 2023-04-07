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
} from '@chakra-ui/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { loggedInUser } from './PageContainer';
import UserAvatar from './UserAvatar';

const UserSettings = ({ user }: UserSettingsProps) => {
  const [firstName, setFirstName] = useState(loggedInUser?.firstName);
  const [lastName, setLastName] = useState(loggedInUser?.lastName);
  const [email, setEmail] = useState(loggedInUser?.email);
  const [avatar, setAvatar] = useState('');
  const fileInput = useRef<HTMLInputElement | null>(null);

  const openFileBrowser = () => {
    fileInput.current && fileInput.current.click();
  };

  const setAvatarThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(URL.createObjectURL(event.target.files[0] as Blob));
    }
  };

  return (
    <>
      <Heading>Profile Settings</Heading>
      <Divider marginY={4} />
      <Box padding={4}>
        <Heading fontSize='xl' marginBottom={4}>
          Public Settings
        </Heading>
        <form>
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
                <UserAvatar user={loggedInUser} size='2xl' />
                <Button onClick={openFileBrowser}>Change Avatar</Button>
                <input
                  style={{ display: 'none' }}
                  ref={fileInput}
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
              <Button colorScheme='green'>Save</Button>
            </HStack>
          </Stack>
        </form>
      </Box>
      <Box padding={4}>
        <Heading fontSize='xl' marginBottom={4}>
          Change Password
        </Heading>
        <form>
          <Stack>
            <Text>Old Password</Text>
            <Input type='password' />
            <Text>New Password</Text>
            <Input type='password' />
            <Text>New Password Again</Text>
            <Input type='password' />
            <HStack justifyContent='flex-end'>
              <Button colorScheme='green'>Save</Button>
            </HStack>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default UserSettings;
