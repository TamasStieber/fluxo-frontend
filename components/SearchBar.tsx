import { Center, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${searchRef.current?.value}`);
  };

  return (
    <Center>
      <form onSubmit={(event) => handleSubmit(event)}>
        <InputGroup width='500px'>
          <InputLeftElement
            pointerEvents='none'
            // eslint-disable-next-line react/no-children-prop
            children={<AiOutlineSearch color='gray.300' fontSize='1.2rem' />}
          />
          <Input
            ref={searchRef}
            variant='filled'
            placeholder={`Search for people or posts`}
          />
        </InputGroup>
      </form>
    </Center>
  );
};

export default SearchBar;
