import { FormattedPostContentProps } from '@/interfaces/props';
import { Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const FormattedPostContent = ({ length, post }: FormattedPostContentProps) => {
  const [isExpanded, setExpanded] = useState(false);

  const isTooLong = post.content.length > length;
  const formattedText =
    isExpanded || !isTooLong
      ? post.content
      : post.content.slice(0, length) + '...';

  return (
    <>
      <Text display='inline' marginTop={4}>
        {formattedText}
      </Text>
      {isTooLong && (
        <Button
          colorScheme='blue'
          marginLeft={2}
          variant='link'
          fontWeight='normal'
          onClick={() => setExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </>
  );
};

export default FormattedPostContent;
