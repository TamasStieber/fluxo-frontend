import { Avatar } from '@chakra-ui/react';
import React from 'react';
import { UserAvatarProps } from '@/interfaces/props';

const UserAvatar = ({ user, size, url }: UserAvatarProps) => {
  const urlProvided = typeof url !== 'undefined';
  let src = urlProvided ? url : '';

  if (!urlProvided && user?.profilePictureUrl) {
    src = `${process.env.BACKEND_URL}/${user.photosFolder}/${user.profilePictureUrl}`;
  }
  const name = `${user?.firstName} ${user?.lastName}`;
  return <Avatar size={size ? size : 'md'} name={name} src={src}></Avatar>;
};

export default UserAvatar;
