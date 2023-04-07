import { User } from '@/interfaces/interfaces';
import { LikeProps, LikesProps } from '@/interfaces/props';
import { Center, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { loggedInUser } from './PageContainer';
import { checkAuth } from '@/utils/utils';

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

const Likes = ({ currentUserId, post }: LikesProps) => {
  const token = checkAuth();
  const [likedByUsers, setLikedByUsers] = useState(post.likes);
  const isLikedByUser = likedByUsers.find((user) => user._id === currentUserId);

  const handleClick = () => {
    if (!loggedInUser) return;
    const route = isLikedByUser ? 'remove-like' : 'add-like';

    fetch(`${process.env.BACKEND_URL}/posts/${post._id}/${route}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id: currentUserId }),
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

    const currentUser = likedByUsers.find((user) => user._id === currentUserId);
    if (currentUser) likes.push(currentUser);

    for (const user of likedByUsers) {
      if (user._id !== currentUserId) likes.push(user);
    }

    const likedByNames = likes.map((user) =>
      user._id === currentUserId ? 'You' : `${user.firstName}`
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
