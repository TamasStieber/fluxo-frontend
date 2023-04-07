import {
  HStack,
  IconButton,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    // <HStack>
    //   <IconButton
    //     aria-label='Change color mode'
    //     onClick={toggleColorMode}
    //     fontSize='20px'
    //     variant='ghost'
    //     icon={colorMode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
    //   />
    // </HStack>
    <HStack>
      <Switch
        colorScheme='green'
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
      />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
