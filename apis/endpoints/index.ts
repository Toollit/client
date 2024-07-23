export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

export const ENDPOINTS = {
  GET: {
    PROJECT_OVERVIEWS: (page: number, order: 'new' | 'popularity') => {
      return `/api/post/projectOverviews?page=${page}&order=${order ?? 'new'}`;
    },
    DUPLICATE_NICKNAME_CHECK: (nickname: string) => {
      return `/api/user/duplicateNicknameCheck`;
    },
  },
  CREATE: {
    PW_INQUIRY: `/api/user/pwInquiry`,
    ISSUE_AUTH_CODE: `/api/auth/email/issueAuthCode`,
  },
  UPDATE: {
    RESET_PASSWORD: `/api/user/resetPassword`,
    NICKNAME_INITIALIZE: `/api/user/signup/nickname-initialize`,
  },
  DELETE: {},
};

export const AUTH_ENDPOINTS = {
  SIGNIN: `/api/user/signin/email`,
};
