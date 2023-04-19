import { CurrentUserContext } from '@/contexts/CurrentUserContext';
import useAcquaintances from '@/hooks/useAcquaintances';
import { User } from '@/interfaces/interfaces';
import {
  SimpleGrid,
  Button,
  Text,
  Box,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import UserAvatar from './UserAvatar';
import AllFriendsModal from './AllFriendsModal';

interface FriendsBoxProps {
  user: User | null;
}

const FriendsBox = ({ user }: FriendsBoxProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { acquaintances, firstSixFriends, isLoading, error } = useAcquaintances(
    user?._id
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sameUser = currentUser?.email === user?.email && true;

  const commonFriends = acquaintances.filter((acquaintance) =>
    currentUser?.acquaintances.includes(acquaintance._id)
  );

  const singularOrPluralFriend =
    commonFriends.length !== 1 ? 'friends' : 'friend';

  if (!user || error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Text fontSize='xl'>{`Friends (${acquaintances.length})`}</Text>
      {!sameUser && (
        <Text fontSize='sm'>{`${commonFriends.length} ${singularOrPluralFriend} in common`}</Text>
      )}
      <SimpleGrid columns={3} spacing={6} marginY={2}>
        {firstSixFriends.map((acquaintance) => (
          <UserAvatar
            key={acquaintance._id}
            user={acquaintance}
            size='md'
            clickable
            tooltip
          />
        ))}
      </SimpleGrid>
      <Button colorScheme='blue' variant='link' onClick={onOpen}>
        Show all friends
      </Button>
      <AllFriendsModal
        firstName={user.firstName}
        acquaintances={acquaintances}
        commonFriends={commonFriends}
        sameUser={sameUser}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default FriendsBox;
