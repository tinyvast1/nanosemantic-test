import axios, { AxiosInstance } from 'axios';
import {
  ICommonWrapResponseData,
  ISendEventRequestData,
  ISendMessageRequestData,
  ISendMessageResponseData,
} from '../types';
import { ChatBotLocalStorage } from './ChatBotLocalStorage';

export class ChatBotAPI extends ChatBotLocalStorage {
  private api: AxiosInstance;

  constructor(uuid: string) {
    super(uuid);

    this.api = axios.create({
      baseURL: 'https://biz.nanosemantics.ru/api/2.1/json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((req) => {
      req.data.cuid = this.cuid;

      return req;
    });

    this.api.interceptors.response.use((resp) => {
      try {
        const newCuid = resp.data.result.cuid;

        if (newCuid && newCuid !== this.cuid) {
          this.setCUIDInLocalStorage(newCuid);
          this.cuid = newCuid;
        }
      } catch (error) {
        console.log(error);
      }

      return resp;
    });
  }

  async init() {
    const resp = await this.api.post<ICommonWrapResponseData>('/Chat.init', {
      uuid: this.uuid,
    });

    return resp.data;
  }

  public async sendMessage(payload: ISendMessageRequestData) {
    const resp = await this.api.post<
      ICommonWrapResponseData<ISendMessageResponseData>
    >('/Chat.request', {
      ...payload,
    });

    return resp.data;
  }

  public async sendEvent(payload: ISendEventRequestData) {
    const resp = await this.api.post<
      ICommonWrapResponseData<ISendMessageResponseData>
    >('/Chat.event', {
      ...payload,
    });

    return resp.data;
  }
}
