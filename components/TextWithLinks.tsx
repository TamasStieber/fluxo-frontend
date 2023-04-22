import { Link, extendTheme, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface TextWithLinksProps {
  text: string;
}

const TextWithLinks = ({ text }: TextWithLinksProps) => {
  const regex = /(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]+/;
  const lines = text.split('\n');

  const color = useColorModeValue('blue.500', 'blue.300');

  return (
    <>
      {lines.map((line, index) => (
        <span key={index} style={{ display: 'block' }}>
          {line.split(/\s+/).map((word, index) => {
            if (regex.test(word)) {
              const href = word.includes('http') ? word : 'http://' + word;
              return (
                <>
                  <Link key={index} href={href} textColor={color} isExternal>
                    {word}
                  </Link>{' '}
                </>
              );
            } else {
              return <span key={index}>{word} </span>;
            }
          })}
        </span>
      ))}
    </>
  );
};

export default TextWithLinks;
