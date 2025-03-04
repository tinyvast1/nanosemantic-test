import { Messages, useChatBotContext } from '@/entities/Chat';
import styles from './style.module.css';
import IconLoader from '@/shared/assets/loader.svg';

const Body = () => {
  const { isLoadingInit, isErrorInit, errorInit } = useChatBotContext();

  if (isLoadingInit) {
    return (
      <div className={styles.loader}>
        <img src={IconLoader} className={styles.icon} />
      </div>
    );
  }

  if (isErrorInit) {
    return <div className={styles.error}>{errorInit}</div>;
  }

  return <Messages />;
};

export default Body;

