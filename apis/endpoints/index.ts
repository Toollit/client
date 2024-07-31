export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

export const ENDPOINTS = {
  GET: {
    PROJECT_OVERVIEWS: (page: number, order: 'new' | 'popularity') => {
      return `/api/post/project-overviews?page=${page}&order=${order ?? 'new'}`;
    },
    PROJECT_DETAIL: (postId: string) => {
      return `/api/post/project/${postId}`;
    },
    DUPLICATE_NICKNAME_CHECK: (nickname: string) => {
      return `/api/user/duplicate-nickname-check?nickname=${nickname}`;
    },
    BOOKMARK_STATUS: (postId: string) => {
      return `/api/post/bookmark/status/${postId}`;
    },
    MY_BOOKMARK_IDS: `/api/post/bookmark/bookmarkIds`,
  },
  CREATE: {
    PW_INQUIRY: `/api/user/pw-inquiry`,
    PROJECT: `/api/post/project/create`,
    REPORT: `/api/post/report`,
    CONTACT: `/api/user/contact`,
    JOIN_PROJECT_REQUEST: `/api/post/project/join`,
    JOIN_REJECT_PROJECT_REQUEST: `/api/post/project/join/reject`,
  },
  UPDATE: {
    RESET_PASSWORD: `/api/user/reset-password`,
    NICKNAME_INITIALIZE: `/api/user/signup/nickname-initialize`,
    BOOKMARK_TOGGLE: `/api/post/bookmark/toggle`,
    PROJECT: `/api/post/project/update`,
    PROFILE: (category: string) => {
      return `/api/user/profile/${category}`;
    },
    LEAVE_PROJECT: `/api/post/project/leave`,
    JOIN_APPROVE_PROJECT: `/api/post/project/join/approve`,
  },
  DELETE: {
    ACCOUNT: `/api/user/deleteAccount`,
    ACCOUNT_CONFIRM: `/api/user/deleteAccount/confirm`,
    PROJECT: `/api/post/project/delete`,
    NOTIFICATION: `/api/user/profile/notification/delete`,
  },
};

export const AUTH_ENDPOINTS = {
  SIGNUP: `/api/user/signup`,
  SIGNIN: `/api/user/signin/email`,
  LOGOUT: `/api/user/logout`,
  EMAIL_AUTH_CODE: `/api/auth/email/auth-code`,
  EMAIL_VERIFY: `/api/auth/email/verify`,
};
