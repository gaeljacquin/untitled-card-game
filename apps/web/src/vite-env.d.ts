/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_AUTHOR: string;
  readonly VITE_LINKTREE: string;
  readonly VITE_PROFILE_PIC: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_MAINTENANCE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
