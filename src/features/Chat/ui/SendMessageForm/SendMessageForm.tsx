import { useChatBotContext } from '@/entities/Chat';
import { FormEvent, useState } from 'react';
import styles from './style.module.css';
import { Button, Input } from '@/shared/ui';

const SendMessageForm = () => {
  const [value, setValue] = useState('');
  const { sendMessage, isLoading } = useChatBotContext();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValue('');
    sendMessage(value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button type="submit" loading={isLoading}>
        Send
      </Button>
    </form>
  );
};

export default SendMessageForm;
