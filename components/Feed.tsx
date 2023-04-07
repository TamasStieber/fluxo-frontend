import { Box, Center } from '@chakra-ui/react';
import PostCard from './PostCard';
import { FeedProps } from '@/interfaces/props';

const Feed = ({ posts }: FeedProps) => {
  return (
    <Box marginTop={4} flexDirection='column'>
      {posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
    </Box>
  );
};

export default Feed;
