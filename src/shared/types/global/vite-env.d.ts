/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAT_BOT_UUID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

