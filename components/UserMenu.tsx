import { User } from '@/interfaces/interfaces';
import {
  checkAuth,
  getCurrentUserId,
  logout,
  redirectToProfile,
} from '@/utils/utils';
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
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import ColorModeSwitch from './ColorModeSwitch';
import UserAvatar from './UserAvatar';
import { useContext } from 'react';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import MessagesButton from './MessagesButton';
import FriendRequestsMenu from './FriendRequestsMenu';

const UserMenu = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout(() => router.push('/login'));
  };

  const redirectToSettings = () => {
    router.push(`/settings`);
  };

  return (
    <HStack justifyContent='flex-end' marginRight={2}>
      <FriendRequestsMenu />
      <MessagesButton />
      <Box>
        <Menu closeOnSelect={false}>
          <MenuButton>
            <Icon
              as={IoMdNotificationsOutline}
              fontSize='1.5rem'
              marginTop={2}
              marginRight={2}
            />
          </MenuButton>
          <MenuList>
            <Text marginLeft={2}>No notifications</Text>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Menu closeOnSelect={false}>
          <MenuButton>
            <UserAvatar user={currentUser} size='sm' />
          </MenuButton>
          <MenuList>
            <Text marginLeft={2}>
              {currentUser &&
                `${currentUser.firstName} ${currentUser.lastName}`}
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
                onClick={() => redirectToProfile(currentUser?.userName)}
              >
                My Profile
              </MenuItem>
              <MenuItem
                icon={<AiOutlineSetting fontSize='1.2rem' />}
                onClick={redirectToSettings}
              >
                Account Settings
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
      </Box>
    </HStack>
  );
};

export default UserMenu;
