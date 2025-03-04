import { useEffect, useState } from 'react';
import { ChatBotAPI } from '../api';
import { ESenderType, ETypeEvent, IMessage } from '../types';

export function useChatBotAPI(uuid: string) {
  const [chatBotAPI] = useState(new ChatBotAPI(uuid));
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [historyMessage, setHistoryMessage] = useState(
    chatBotAPI.getHistoryMessageFromLocalStorage() ?? []
  );

  const setHistoryMessageAndSaveInLocalStorage = (newMessage: IMessage) => {
    setHistoryMessage((historyMessage) => {
      const newHistoryMessage = [...historyMessage, newMessage];
      chatBotAPI.setHistoryMessageInLocalStorage(newHistoryMessage);
      return newHistoryMessage;
    });
  };

  useEffect(() => {
    if (!historyMessage.length) {
      chatInit();
    }
  }, []);

  const chatInit = () => {
    setIsLoading(true);

    chatBotAPI
      .init()
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      })
      .then(() => sendWelcomeMessage());
  };

  const sendWelcomeMessage = () => {
    setIsLoading(true);

    chatBotAPI
      .sendEvent({
        euid: ETypeEvent.READY,
      })
      .then(() => {
        setHistoryMessageAndSaveInLocalStorage({
          sender: ESenderType.BOT,
          message: 'Здравствуйте.',
        });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendMessage = (message: string) => {
    setIsLoading(true);

    setHistoryMessageAndSaveInLocalStorage({
      sender: ESenderType.CLIENT,
      message,
    });

    chatBotAPI
      .sendMessage({ text: message })
      .then((res) => {
        setHistoryMessageAndSaveInLocalStorage({
          sender: ESenderType.BOT,
          message: res.result.text.value,
        });
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetChat = () => {
    setHistoryMessage([]);
    chatInit();
  };

  return {
    isLoading,
    isError,
    historyMessage,
    sendMessage,
    resetChat,
  };
}
