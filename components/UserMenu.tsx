import { User } from '@/interfaces/interfaces';
import { checkAuth, getCurrentUserId, logout } from '@/utils/utils';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Box,
  Flex,
  Avatar,
  Text,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineMessage,
} from 'react-icons/ai';
import ColorModeSwitch from './ColorModeSwitch';
import { loggedInUser } from './PageContainer';
import UserAvatar from './UserAvatar';

const UserMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout(() => router.push('/login'));
  };

  const redirectToProfile = () => {
    router.push(`/users/${getCurrentUserId()}`);
  };

  const redirectToSettings = () => {
    router.push(`/settings`);
  };

  return (
    <HStack justifyContent='flex-end' marginRight={2}>
      <IconButton
        variant='ghost'
        aria-label='Messages'
        icon={<AiOutlineMessage fontSize='1.5rem' />}
      />
      <Menu closeOnSelect={false}>
        <MenuButton>
          <IconButton
            variant='ghost'
            aria-label='Notifications'
            icon={<IoMdNotificationsOutline fontSize='1.5rem' />}
          />
        </MenuButton>
        <MenuList>
          <Text marginLeft={2}>No notifications</Text>
        </MenuList>
      </Menu>
      <Menu closeOnSelect={false}>
        <MenuButton>
          <UserAvatar user={loggedInUser} size='sm' />
        </MenuButton>
        <MenuList>
          <Text marginLeft={2}>
            {loggedInUser &&
              `${loggedInUser.firstName} ${loggedInUser.lastName}`}
          </Text>
          <MenuDivider />
          <MenuGroup>
            <MenuItem>
              <ColorModeSwitch />
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              icon={<CgProfile fontSize='1.2rem' />}
              onClick={redirectToProfile}
            >
              My Profile
            </MenuItem>
            <MenuItem
              icon={<AiOutlineSetting fontSize='1.2rem' />}
              onClick={redirectToSettings}
            >
              Settings
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              icon={<AiOutlineLogout fontSize='1.2rem' />}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default UserMenu;
