import { User } from '@/interfaces/interfaces';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import UserCard from './UserCard';

interface AllFriendsModalProps {
  firstName: string;
  acquaintances: User[];
  commonFriends: User[];
  sameUser: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const AllFriendsModal = ({
  firstName,
  acquaintances,
  commonFriends,
  sameUser,
  isOpen,
  onClose,
}: AllFriendsModalProps) => {
  const [allFriendsFilter, setAllFriendsFilter] = useState('');
  const [commonFriendsFilter, setCommonFriendsFilter] = useState('');

  const resetFiltersAndClose = () => {
    setAllFriendsFilter('');
    setCommonFriendsFilter('');
    onClose();
  };

  const filteredAllFriends = acquaintances.filter(({ firstName, lastName }) =>
    `${firstName} ${lastName}`
      .toLowerCase()
      .includes(allFriendsFilter.toLowerCase())
  );

  const filteredCommonFriends = commonFriends.filter(
    ({ firstName, lastName }) =>
      `${firstName} ${lastName}`
        .toLowerCase()
        .includes(commonFriendsFilter.toLowerCase())
  );
  return (
    <Modal isOpen={isOpen} onClose={resetFiltersAndClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${firstName}'s friends`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY='auto' maxHeight='70vh'>
          <Tabs isFitted variant='line'>
            <TabList mb='1em'>
              <Tab>{`All (${acquaintances.length})`}</Tab>
              {!sameUser && <Tab>{`Commmon (${commonFriends.length})`}</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input
                  onChange={(event) => setAllFriendsFilter(event.target.value)}
                  placeholder='Search'
                ></Input>
                {filteredAllFriends.map((acquaintance) => (
                  <UserCard key={acquaintance._id} user={acquaintance} />
                ))}
              </TabPanel>
              {!sameUser && (
                <TabPanel>
                  <Input
                    onChange={(event) =>
                      setCommonFriendsFilter(event.target.value)
                    }
                    placeholder='Search'
                  ></Input>
                  {filteredCommonFriends.map((acquaintance) => (
                    <UserCard key={acquaintance._id} user={acquaintance} />
                  ))}
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AllFriendsModal;
