import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import {
  Box,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FiUsers } from 'react-icons/fi';
import FriendRequest from './FriendRequest';
import { FriendRequestsContext } from '@/contexts/FriendRequestsContext';

const FriendRequestsMenu = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { friendRequests } = useContext(FriendRequestsContext);

  const backgroundColor = document.body
    ? window.getComputedStyle(document.body).backgroundColor
    : 'none';

  const receivedFriendRequests = friendRequests.filter(
    (friendRequest) => friendRequest.sender._id !== currentUser?._id
  );

  if (!currentUser?.friendRequests) return null;

  return (
    <Box>
      <Menu closeOnSelect={false}>
        <MenuButton style={{ position: 'relative' }}>
          <Icon as={FiUsers} fontSize='1.5rem' marginTop={2} marginRight={2} />
          {receivedFriendRequests.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                boxSizing: 'content-box',
                width: '7px',
                height: '7px',
                borderRadius: '100%',
                border: '3px solid',
                borderColor: backgroundColor,
                backgroundColor: 'red',
              }}
            ></div>
          )}
        </MenuButton>
        <MenuList>
          {receivedFriendRequests.length > 0 ? (
            receivedFriendRequests.map((friendRequest) => (
              <MenuItem key={friendRequest._id}>
                <FriendRequest friendRequest={friendRequest} />
              </MenuItem>
            ))
          ) : (
            <Text marginLeft={2}>No new friend requests</Text>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default FriendRequestsMenu;
