import { useMergeRefs } from '@listic/react/utils';
import React, { useCallback, useRef } from 'react';
import { Textarea, TextareaProps } from './Textarea';

interface AutoResizeTextareaProps extends TextareaProps {
  initialHeight?: number;
  maxHeight?: number;
}

export const AutoResizeTextarea = React.memo(
  React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
    ({ onInput: onInputProp, initialHeight = 52, maxHeight, ...rest }, ref) => {
      const textareaRef = useRef<HTMLTextAreaElement | null>(null);
      const mergedRef = useMergeRefs(textareaRef, ref);

      const onInput = useCallback(
        (event: React.FormEvent<HTMLTextAreaElement>) => {
          onInputProp?.(event);
          const el = textareaRef.current;

          if (el && !el.value) {
            el.style.height = `${initialHeight}px`;
          } else if (el && el.scrollHeight > initialHeight) {
            el.style.height = 'auto';
            const newHeight = Math.min(
              el.scrollHeight,
              maxHeight ?? Number.MAX_SAFE_INTEGER
            );
            el.style.height = `${newHeight}px`;
          }
        },
        [initialHeight, maxHeight, onInputProp]
      );

      return (
        <Textarea
          ref={mergedRef}
          {...rest}
          style={{
            ...rest.style,
            minHeight: `${initialHeight}px`,
            overflow: 'hidden',
            resize: 'none',
          }}
          onInput={onInput}
        />
      );
    }
  )
);
