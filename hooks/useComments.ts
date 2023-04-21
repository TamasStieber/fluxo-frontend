import { Comment } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useEffect, useState } from 'react';

const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);

  const token = checkAuth();

  useEffect(() => {
    try {
      fetch(`${process.env.BACKEND_URL}/comments/${postId}?skip=0&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setComments(data.comments);
            setCount(data.count);
            setSkip(5);
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [postId, token]);

  const loadMoreComments = () => {
    try {
      fetch(
        `${process.env.BACKEND_URL}/comments/${postId}?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setComments([...comments, ...data.comments]);
            setSkip(skip + 5);
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const postComment = (postId: string, author: string, content: string) => {
    const comment = {
      post: postId,
      author: author,
      content: content,
    };

    try {
      fetch(`${process.env.BACKEND_URL}/comments`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(comment),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setComments([data.comment, ...comments]);
            setSkip(skip + 1);
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return { comments, count, skip, loadMoreComments, postComment };
};

export default useComments;
