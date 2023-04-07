import { Avatar } from '@chakra-ui/react';
import React from 'react';
import { loggedInUser } from './PageContainer';
import { User } from '@/interfaces/interfaces';
import { UserAvatarProps } from '@/interfaces/props';

const UserAvatar = ({ user, size }: UserAvatarProps) => {
  let src = '';

  if (user?.profilePictureUrl) {
    src = `${process.env.BACKEND_URL}/${user._id}/photos/${user.profilePictureUrl}`;
  }
  const name = `${user?.firstName} ${user?.lastName}`;
  return <Avatar size={size ? size : 'md'} name={name} src={src}></Avatar>;
};

export default UserAvatar;
