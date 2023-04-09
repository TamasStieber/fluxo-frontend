import { FormattedPostContentProps } from '@/interfaces/props';
import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const FormattedPostContent = ({
  length,
  content,
}: FormattedPostContentProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const contentTextRef = useRef<HTMLDivElement>(null);

  //   const calculateRows = () => {
  //     if (contentTextRef.current) {
  //       const height = contentTextRef.current.clientHeight;
  //       const lineHeight = parseFloat(
  //         window.getComputedStyle(contentTextRef.current).lineHeight
  //       );
  //       return Math.ceil(height / lineHeight);
  //     }
  //   };

  //   useEffect(() => {
  //     console.log(calculateRows());
  //   }, []);

  const isTooLong = content.length > length;
  const formattedText =
    isExpanded || !isTooLong ? content : content.slice(0, length) + '...';

  return (
    <>
      <Box ref={contentTextRef}>
        <Text whiteSpace='pre-wrap' display='inline' marginTop={4}>
          {formattedText}
        </Text>
      </Box>
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
