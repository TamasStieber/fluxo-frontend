import { destroyCookie, parseCookies } from 'nookies';

export const checkAuth = () => {
  const cookies = parseCookies();
  const token = cookies.token;

  return token;
};

export const getCurrentUserId = () => {
  const cookies = parseCookies();
  const userId = cookies.userId;

  return userId;
};

export const logout = (callback: () => void) => {
  destroyCookie(null, 'token');
  destroyCookie(null, 'userId');

  const cookies = parseCookies();
  if (!cookies.token && !cookies.userId) callback();
};
