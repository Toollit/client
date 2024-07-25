export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

export const ENDPOINTS = {
  GET: {
    PROJECT_OVERVIEWS: (page: number, order: 'new' | 'popularity') => {
      return `/api/post/project-overviews?page=${page}&order=${order ?? 'new'}`;
    },
    DUPLICATE_NICKNAME_CHECK: (nickname: string) => {
      return `/api/user/duplicate-nickname-check?nickname=${nickname}`;
    },
  },
  CREATE: {
    PW_INQUIRY: `/api/user/pw-inquiry`,
    EMAIL_AUTH_CODE: `/api/auth/email/auth-code`,
  },
  UPDATE: {
    RESET_PASSWORD: `/api/user/reset-password`,
    NICKNAME_INITIALIZE: `/api/user/signup/nickname-initialize`,
  },
  DELETE: {},
};

export const AUTH_ENDPOINTS = {
  SIGNIN: `/api/user/signin/email`,
};
