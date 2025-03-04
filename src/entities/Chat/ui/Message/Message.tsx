import { FC } from 'react';
import { IMessage } from '../../types';
import styles from './style.module.css';

const Message: FC<IMessage> = (props) => {
  const { message } = props;

  return (
    <div
      className={styles.message}
      dangerouslySetInnerHTML={{
        __html: message,
      }}
    />
  );
};

export default Message;
