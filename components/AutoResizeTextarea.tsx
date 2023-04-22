import { Textarea } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const AutoResizeTextarea = (props: AutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textarea = textareaRef.current;
  if (textarea) {
    if (textarea.scrollHeight > 346) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.height = 'auto';
      textarea.style.overflow = 'hidden';
      textarea.style.height = textarea?.scrollHeight + 'px';
    }
  }

  return (
    <Textarea
      ref={textareaRef}
      {...props}
      autoFocus
      rows={3}
      resize='none'
      overflow='hidden'
    />
  );
};

export default AutoResizeTextarea;
