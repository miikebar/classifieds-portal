import { Button } from '@listic/ui/button';
import { AutoResizeTextarea } from '@listic/ui/input';
import React, { useCallback, useRef } from 'react';

export const INPUT_NAME = 'message';

interface ChatInputProps {
  onSubmit(message: string): void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit: onSubmitProp,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = useCallback(() => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const content = formData.get(INPUT_NAME)?.toString().trim();

    if (content) {
      onSubmitProp(content);
      formRef.current.reset();
    }
  }, [onSubmitProp]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
        event.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex">
      <AutoResizeTextarea
        name={INPUT_NAME}
        onKeyDown={onKeyDown}
        placeholder="Wpisz swoją wiadomość, a następnie kliknij Enter aby wysłać"
      />
      <Button type="submit">Wyślij</Button>
    </form>
  );
};
