export enum ESenderType {
  BOT = 'BOT',
  CLIENT = 'CLIENT',
}

export type TContext = Record<string, unknown>;
export type TCUID = string | null;
export type IMessage = {
  sender: ESenderType;
  message: string;
};

export interface ICommonRequestData {
  cuid: string;
}

export interface ICommonWrapResponseData<T = Record<string, unknown>> {
  result: T & {
    cuid: string;
  };

  id: string;
}

export interface IInitRequestData extends Partial<ICommonRequestData> {
  uuid: string;
}

export interface ISendMessageRequestData {
  text: string;
}

export interface ISendMessageResponseData {
  id: string;
  text: {
    value: string;
  };
}

export enum ETypeEvent {
  READY = 'READY',
}

export interface ISendEventRequestData {
  euid: ETypeEvent;
}

export enum ELocalStorageKey {
  CHAT_BOT_CUID = 'CHAT_BOT_CUID',
  CHAT_HISTORY_MESSAGE = 'CHAT_HISTORY_MESSAGE',
}
