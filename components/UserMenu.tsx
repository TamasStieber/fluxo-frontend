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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import ColorModeSwitch from './ColorModeSwitch';
import { loggedInUser } from './PageContainer';

const UserMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const redirectToProfile = () => {
    router.push(`/users/${getCurrentUserId()}`);
  };

  return (
    <Flex justifyContent='flex-end' marginRight={2}>
      <Menu closeOnSelect={false}>
        <MenuButton>
          <Avatar
            size='sm'
            name={
              loggedInUser
                ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
                : undefined
            }
            src=''
          />
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
            <MenuItem icon={<CgProfile />} onClick={redirectToProfile}>
              My Profile
            </MenuItem>
            <MenuItem icon={<AiOutlineSetting />}>Settings</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem icon={<AiOutlineLogout />} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserMenu;
