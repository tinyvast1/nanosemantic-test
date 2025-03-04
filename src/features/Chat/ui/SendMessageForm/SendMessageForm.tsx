import { useChatBotContext } from '@/entities/Chat';
import { FormEvent, useState } from 'react';
import styles from './style.module.css';
import { Button, Input } from '@/shared/ui';

const SendMessageForm = () => {
  const [value, setValue] = useState('');
  const {
    sendMessage,
    isLoadingInit,
    isPendingSendMessage,
    isErrorInit,
    isErrorSendMessage,
    errorSendMessage,
  } = useChatBotContext();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValue('');
    sendMessage({
      text: value.trim(),
    });
  };

  const disabled = isLoadingInit || isPendingSendMessage || isErrorInit;

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          className={styles.input}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button
          disabled={disabled || !value}
          type="submit"
          loading={isPendingSendMessage}
        >
          Send
        </Button>
      </form>
      {isErrorSendMessage && (
        <div className={styles.error}>{errorSendMessage}</div>
      )}
    </>
  );
};

export default SendMessageForm;

