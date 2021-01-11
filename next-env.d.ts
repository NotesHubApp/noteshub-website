/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_APPNAME: string
    NEXT_PUBLIC_APPTITLE: string
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string
  }
}
