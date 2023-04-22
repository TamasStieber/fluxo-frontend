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

  const createPost = (postFormData: FormData, onClose: () => void) => {
    setCreating(true);
    fetch(`${process.env.BACKEND_URL}/posts`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: postFormData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          onClose();
          setPosts([data.post, ...posts]);
        }
      })
      .catch((error) => setError(error))
      .finally(() => setCreating(false));
  };

  const updatePost = (formData: FormData) => {};

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
