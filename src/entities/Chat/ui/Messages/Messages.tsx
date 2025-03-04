import clsx from 'clsx';
import { useChatBotContext } from '../../providers';
import { ESenderType } from '../../types';
import Message from '../Message/Message';
import styles from './style.module.css';

const Messages = () => {
  const { historyMessage } = useChatBotContext();

  return (
    <div className={styles.messages}>
      {historyMessage.map((item) => {
        return (
          <div
            className={clsx(
              styles.message,
              item.sender === ESenderType.BOT ? styles.left : styles.right
            )}
          >
            <Message {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
