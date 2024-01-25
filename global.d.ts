declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_API_HOST: string;
    NEXT_PUBLIC_CLIENT_HOST: string;
    NEXT_PUBLIC_S3_URL: string;
    NEXT_PUBLIC_CONTACT_EMAIL: string;
  }
}
