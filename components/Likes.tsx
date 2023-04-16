import { User } from '@/interfaces/interfaces';
import { LikeProps, LikesProps } from '@/interfaces/props';
import { Center, HStack, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { checkAuth } from '@/utils/utils';
import { CurrentUserContext } from '@/contexts/CurrentUserContext';

const Like = ({ isLiked, handleClick }: LikeProps) => {
  return (
    <Center
      onClick={handleClick}
      cursor='pointer'
      fontSize='xl'
      color={isLiked ? 'red.500' : 'inherit'}
      _hover={{ color: 'red.500' }}
    >
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
    </Center>
  );
};

const Likes = ({ post }: LikesProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const token = checkAuth();
  const [likedByUsers, setLikedByUsers] = useState(post.likes);
  const isLikedByUser = likedByUsers.find(
    (user) => user._id === currentUser?._id
  );

  const handleClick = () => {
    const route = isLikedByUser ? 'remove-like' : 'add-like';

    fetch(`${process.env.BACKEND_URL}/posts/${post._id}/${route}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) =>
        response.json().then((likes) => {
          if (likes.error) {
          } else setLikedByUsers(likes);
        })
      )
      .catch((error) => console.log(error));
  };

  const generateLikedByText = (displayLength: number) => {
    if (likedByUsers.length === 0) return '';

    let likedByText = '';
    let suffix = '';
    const likes: User[] = [];

    const currentUserPresent = likedByUsers.find(
      (user) => user._id === currentUser?._id
    );
    if (currentUserPresent) likes.push(currentUserPresent);

    for (const user of likedByUsers) {
      if (user._id !== currentUser?._id) likes.push(user);
    }

    const likedByNames = likes.map((user) =>
      user._id === currentUser?._id ? 'You' : `${user.firstName}`
    );

    if (likedByUsers.length <= displayLength) {
      likedByText += likedByNames.join(', ');
    } else {
      for (let i = 0; i < displayLength; i++) {
        likedByText += `${likedByNames[i]}, `;
      }
      const othersCount = likedByUsers.length - displayLength;
      likedByText += `and ${othersCount} ${
        othersCount > 1 ? 'others' : 'other'
      }`;
    }

    if (likedByNames.length > 1 || likedByNames[0] === 'You')
      suffix = ' like this';
    else suffix = ' likes this';

    // likedByText += suffix;

    return likedByText;
  };

  return (
    <HStack marginTop={2} spacing={2}>
      <Like isLiked={isLikedByUser} handleClick={handleClick} />
      {/* <Text fontSize='xs' paddingLeft={1} paddingRight={2}>
        {likedByUsers.length > 0 && likedByUsers.length}
      </Text> */}
      <Text fontSize='xs'>{generateLikedByText(3)}</Text>
    </HStack>
  );
};

export default Likes;
