/// <reference path="../.astro/types.d.ts" />
// src/env.d.ts
interface ImportMetaEnv {
    readonly FIREBASE_API_KEY: string;
    readonly FIREBASE_AUTH_DOMAIN: string;
    readonly FIREBASE_PROJECT_ID: string;
    readonly FIREBASE_STORAGE_BUCKET: string;
    readonly FIREBASE_MESSAGING_SENDER_ID: string;
    readonly FIREBASE_APP_ID: string;
    readonly FIREBASE_MEASUREMENT_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // global.d.ts
interface Window {
  dataLayer: any[];
  
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export {};


  