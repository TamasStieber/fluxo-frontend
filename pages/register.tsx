import Logo from '@/components/Logo';
import MainWrapper from '@/components/MainWrapper';
import RegisterForm from '@/components/RegisterForm';
import { checkAuth } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const RegisterPage = () => {
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
          <RegisterForm />
        </>
      )}
    </MainWrapper>
  );
};

export default RegisterPage;
