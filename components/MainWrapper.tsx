import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import { MainWrapperProps } from '@/interfaces/props';
import Head from 'next/head';

const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <>
      <Head>
        <title>Fluxo</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};

export default MainWrapper;
