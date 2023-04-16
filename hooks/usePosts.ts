import { Post, PostFormData } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useState, useEffect } from 'react';

const usePosts = (userId?: string) => {
  const token = checkAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  let url: string;
  if (userId) url = `${process.env.BACKEND_URL}/users/${userId}/posts/`;
  else url = `${process.env.BACKEND_URL}/posts/`;

  useEffect(() => {
    setLoading(true);
    try {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) =>
        response.json().then((data) => {
          if (data.error) {
          } else setPosts(data.posts);
        })
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [token, url, refreshTrigger]);

  const createPost = (postFormData: PostFormData) => {
    setCreating(true);
    try {
      fetch(`${process.env.BACKEND_URL}/posts`, {
        method: 'post',

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(postFormData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setRefreshTrigger(!refreshTrigger);
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setCreating(false);
    }
  };

  const updatePost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  const deletePost = () => {};

  const handleLikeClick = () => {};

  return {
    posts,
    isLoading,
    error,
    isUpdating,
    isCreating,
    createPost,
    updatePost,
    deletePost,
    handleLikeClick,
  };
};

export default usePosts;
