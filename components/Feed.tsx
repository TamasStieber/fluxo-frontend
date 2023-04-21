import { Box, Center } from '@chakra-ui/react';
import PostCard from './PostCard';
import { Post } from '@/interfaces/interfaces';
import { PostContext } from '@/contexts/PostContext';

interface FeedProps {
  posts: Post[];
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  updatePost: (formData: FormData) => void;
  deletePost: (postId: string) => void;
  handleLikeClick: (postId: string) => void;
}

const Feed = ({
  posts,
  isLoading,
  isUpdating,
  error,
  updatePost,
  deletePost,
  handleLikeClick,
}: FeedProps) => {
  return (
    <Box marginTop={4}>
      {posts.map((post) => (
        <PostContext.Provider
          key={post._id}
          value={{
            post,
            isLoading,
            isUpdating,
            error,
            updatePost,
            deletePost,
            handleLikeClick,
          }}
        >
          <PostCard post={post} />
        </PostContext.Provider>
      ))}
    </Box>
  );
};

export default Feed;
