import { ChatBotProvider } from '@/entities/Chat';
import { ResetChat, SendMessageForm } from '@/features/Chat';
import { FC } from 'react';
import styles from './style.module.css';
import { Body } from '../Body';

interface IChatProps {
  uuid: string;
}

const Chat: FC<IChatProps> = ({ uuid }) => {
  return (
    <ChatBotProvider uuid={uuid}>
      <div className={styles.chat}>
        <div className={styles.container}>
          <div className={styles.resetChat}>
            <ResetChat />
          </div>
          <div className={styles.bodyMessage}>
            <Body />
          </div>
          <hr className={styles.divider} />
          <SendMessageForm />
        </div>
      </div>
    </ChatBotProvider>
  );
};

export default Chat;

