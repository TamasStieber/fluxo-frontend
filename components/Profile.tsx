import { ProfileProps } from '@/interfaces/props';
import ProfileHeader from './ProfileHeader';
import { Box } from '@chakra-ui/react';
import ProfileContent from './ProfileContent';

const Profile = ({ user }: ProfileProps) => {
  return (
    <Box>
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </Box>
  );
};

export default Profile;
