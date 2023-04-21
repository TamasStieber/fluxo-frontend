import { Link, extendTheme, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface TextWithLinksProps {
  text: string;
}

const TextWithLinks = ({ text }: TextWithLinksProps) => {
  const regex = /(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]+/;
  const lines = text.split('\n');
  const words = text.split(/\s+/);

  const color = useColorModeValue('blue.500', 'blue.300');

  return (
    <>
      {lines.map((line, index) => (
        <div key={index}>
          {line.split(/\s+/).map((word, index) => {
            if (regex.test(word)) {
              return (
                <>
                  <Link key={index} href={word} textColor={color} isExternal>
                    {word}
                  </Link>{' '}
                </>
              );
            } else {
              return <span key={index}>{word} </span>;
            }
          })}
        </div>
      ))}
    </>
  );
};

export default TextWithLinks;
