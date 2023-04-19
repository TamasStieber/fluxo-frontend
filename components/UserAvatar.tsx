import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { UserAvatarProps } from '@/interfaces/props';
import { redirectToProfile } from '@/utils/utils';

const UserAvatar = ({
  user,
  size,
  url,
  clickable,
  tooltip,
}: UserAvatarProps) => {
  const urlProvided = typeof url !== 'undefined';
  let src = urlProvided ? url : '';

  if (!urlProvided && user?.profilePictureUrl) {
    src = `${process.env.BACKEND_URL}/${user.photosFolder}/${user.profilePictureUrl}`;
  }
  const name = `${user?.firstName} ${user?.lastName}`;
  return (
    <Tooltip label={tooltip && `${user?.firstName} ${user?.lastName}`}>
      <Avatar
        cursor={clickable ? 'pointer' : 'initial'}
        onClick={() => clickable && redirectToProfile(user?.userName)}
        size={size ? size : 'md'}
        name={name}
        src={src}
      ></Avatar>
    </Tooltip>
  );
};

export default UserAvatar;
