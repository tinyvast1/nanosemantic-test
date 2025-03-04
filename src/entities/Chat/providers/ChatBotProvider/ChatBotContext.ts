import { createContext, useContext } from 'react';
import { useChatBotAPI } from '../../hooks/useChatBotAPI';

export const ChatBotContext = createContext<
  Partial<ReturnType<typeof useChatBotAPI>>
>({});

export function useChatBotContext() {
  return useContext(ChatBotContext) as ReturnType<typeof useChatBotAPI>;
}
