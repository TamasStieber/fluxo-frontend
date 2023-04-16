import router from 'next/router';
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

export const calculatePassedTime = (creationDate: Date) => {
  const currentDate = new Date();
  const millisecondsPassed = currentDate.getTime() - creationDate.getTime();
  const secondsPassed = Math.round(millisecondsPassed / 1000);
  const minutesPassed = Math.round(millisecondsPassed / 1000 / 60);
  const hoursPassed = Math.round(millisecondsPassed / 1000 / 60 / 60);
  const daysPassed = Math.round(millisecondsPassed / 1000 / 60 / 60 / 24);

  if (secondsPassed < 60) return 'Just now';
  if (currentDate.getDate() - creationDate.getDate() === 1) return 'Yesterday';
  if (minutesPassed < 60)
    return `${minutesPassed} ${singularOrPlural(minutesPassed, 'minute')} ago`;
  if (hoursPassed < 24)
    return `${hoursPassed} ${singularOrPlural(hoursPassed, 'hour')} ago`;
  if (daysPassed < 10)
    return `${daysPassed} ${singularOrPlural(daysPassed, 'day')} ago`;
  return creationDate.toLocaleDateString('hu-HU');
};

const singularOrPlural = (count: number, word: string) => {
  if (count === 1) return word;
  return word + 's';
};

export const removeDiacritics = (string: string) => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export const redirectToProfile = (username: string | undefined) => {
  username && router.push('/' + username);
};
