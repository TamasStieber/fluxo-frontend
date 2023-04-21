import { Comment } from '@/interfaces/interfaces';
import { checkAuth } from '@/utils/utils';
import { useEffect, useState } from 'react';

const useReplies = (commentId: string) => {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(2);
  const [count, setCount] = useState(5);

  const token = checkAuth();

  useEffect(() => {
    try {
      fetch(
        `${process.env.BACKEND_URL}/comments/replies/${commentId}?skip=0&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setReplies(data.replies);
            setCount(data.count);
            setSkip(2);
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [commentId, token]);

  const loadMoreReplies = () => {
    try {
      fetch(
        `${process.env.BACKEND_URL}/comments/replies/${commentId}?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setReplies([...replies, ...data.replies]);
            setSkip(skip + 2);
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const postReply = (postId: string, author: string, content: string) => {
    const comment = {
      post: postId,
      author: author,
      content: content,
      replyTo: commentId,
    };

    try {
      fetch(`${process.env.BACKEND_URL}/comments/reply`, {
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
            setReplies([data.reply, ...replies]);
            setSkip(skip + 1);
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return { replies, count, skip, loadMoreReplies, postReply };
};

export default useReplies;
