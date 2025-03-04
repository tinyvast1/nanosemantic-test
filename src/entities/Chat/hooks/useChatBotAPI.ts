import { useState } from 'react';
import { ChatBotAPI } from '../api';
import {
  ESenderType,
  ETypeEvent,
  IMessage,
  ISendMessageRequestData,
} from '../types';
import { welcomeMessage } from '../constants';
import { useMutation, useQuery } from '@/shared/hooks';

export function useChatBotAPI(uuid: string) {
  const [chatBotAPI] = useState(new ChatBotAPI(uuid));
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

  const {
    isLoading: isLoadingInit,
    error: errorInit,
    isError: isErrorInit,
  } = useQuery({
    payload: historyMessage,
    queryFn: () =>
      chatBotAPI.init().then(() =>
        chatBotAPI.sendEvent({
          euid: ETypeEvent.READY,
        })
      ),
    onSuccess: () =>
      setHistoryMessageAndSaveInLocalStorage({
        message: welcomeMessage,
        sender: ESenderType.BOT,
      }),
    enabled: !historyMessage.length,
  });

  const {
    mutateAsync: sendMessage,
    isPending: isPendingSendMessage,
    error: errorSendMessage,
    isError: isErrorSendMessage,
  } = useMutation({
    queryFn: (payload: ISendMessageRequestData) =>
      chatBotAPI.sendMessage(payload).then((resp) => {
        setHistoryMessageAndSaveInLocalStorage({
          message: payload.text,
          sender: ESenderType.CLIENT,
        });
        return resp;
      }),
    onSuccess: (data) =>
      data.result.text.value &&
      setHistoryMessageAndSaveInLocalStorage({
        message: data.result.text.value,
        sender: ESenderType.BOT,
      }),
  });

  const resetChat = () => {
    setHistoryMessage([]);
    chatBotAPI.setHistoryMessageInLocalStorage([]);
  };

  return {
    historyMessage,
    isLoadingInit,
    errorInit,
    isErrorInit,
    resetChat,
    sendMessage,
    isPendingSendMessage,
    errorSendMessage,
    isErrorSendMessage,
  };
}

