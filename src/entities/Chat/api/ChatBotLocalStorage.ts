import { TCUID, IMessage, ELocalStorageKey } from '../types';

export class ChatBotLocalStorage {
  public cuid: TCUID;

  constructor(protected uuid: string) {
    this.cuid = this.getCUIDFromLocalStorage();
  }

  protected getLocalStorageKey(key: string) {
    return `${key}-${this.uuid}`;
  }

  protected getCUIDFromLocalStorage() {
    return localStorage.getItem(
      this.getLocalStorageKey(ELocalStorageKey.CHAT_BOT_CUID)
    );
  }

  protected setCUIDInLocalStorage(cuid: TCUID) {
    if (cuid) {
      localStorage.setItem(
        this.getLocalStorageKey(ELocalStorageKey.CHAT_BOT_CUID),
        cuid
      );
    }
  }

  public getHistoryMessageFromLocalStorage(): IMessage[] | undefined {
    try {
      const strHistoryMessage = localStorage.getItem(
        this.getLocalStorageKey(ELocalStorageKey.CHAT_HISTORY_MESSAGE)
      );
      if (strHistoryMessage) {
        const arrStrHistoryMessage = JSON.parse(strHistoryMessage);
        if (Array.isArray(arrStrHistoryMessage)) {
          return arrStrHistoryMessage;
        }
      }
    } catch (error) {
      console.log(error);
    }

    return undefined;
  }

  public setHistoryMessageInLocalStorage(historyMessage: IMessage[]) {
    try {
      localStorage.setItem(
        this.getLocalStorageKey(ELocalStorageKey.CHAT_HISTORY_MESSAGE),
        JSON.stringify(historyMessage)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
