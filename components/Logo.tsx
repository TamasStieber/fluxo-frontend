import { LogoProps } from '@/interfaces/props';
import { HStack, Text } from '@chakra-ui/react';
import { TbCirclesRelation } from 'react-icons/tb';

const Logo = ({ size }: LogoProps) => {
  return (
    <HStack justifyContent='center'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TbCirclesRelation style={{ fontSize: size }} />
        <h1 style={{ fontSize: size }}>Fluxo</h1>
      </div>
    </HStack>
  );
};

export default Logo;
