/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vitest/client" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEV_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
