import { Center, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    <Center>
      <InputGroup width='500px'>
        <InputLeftElement
          pointerEvents='none'
          // eslint-disable-next-line react/no-children-prop
          children={<AiOutlineSearch color='gray.300' />}
        />
        <Input
          variant='filled'
          //   width='500px'
          placeholder={`Search for people`}
        />
      </InputGroup>
    </Center>
  );
};

export default SearchBar;
