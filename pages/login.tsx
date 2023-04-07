import LoginForm from '@/components/LoginForm';
import MainWrapper from '@/components/MainWrapper';
import { checkAuth } from '@/utils/utils';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';

const LoginPage = () => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (checkAuth()) router.push('/');
  }, [router]);

  useEffect(() => {
    setToken(checkAuth());
  }, []);

  return (
    <MainWrapper>
      {token === undefined && (
        <>
          <Logo size='5rem' />
          <LoginForm />
        </>
      )}
    </MainWrapper>
  );
};

export default LoginPage;
