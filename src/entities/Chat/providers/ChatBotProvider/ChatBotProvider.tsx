import { FC, PropsWithChildren } from 'react';
import { ChatBotContext } from './ChatBotContext';
import { useChatBotAPI } from '../../hooks/useChatBotAPI';

interface IChatBotProviderProps extends PropsWithChildren {
  uuid: string;
}

const ChatBotProvider: FC<IChatBotProviderProps> = ({ uuid, children }) => {
  const value = useChatBotAPI(uuid);

  return (
    <ChatBotContext.Provider value={value}>{children}</ChatBotContext.Provider>
  );
};

export default ChatBotProvider;
