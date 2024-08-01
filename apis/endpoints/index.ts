export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

// endpoint rules
// slash(/) : Use when hierarchical relationships between resources are clear
// hyphen(-) : Used to emphasize a particular task or function
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
    TEMPORARY_PASSWORD: `/api/user/temporary-password`,
    PROJECT: `/api/post/project/create`,
    REPORT: `/api/post/report`,
    CONTACT: `/api/user/contact`,
    PROJECT_JOIN_REQUEST: `/api/post/project/join`,
    EMAIL_AUTH_CODE: `/api/auth/email/auth-code`,
    NICKNAME: `/api/user/signup/nickname-initialize`,
  },
  UPDATE: {
    PASSWORD: `/api/user/update-password`,
    BOOKMARK_TOGGLE: `/api/post/bookmark/toggle`,
    PROJECT: `/api/post/project/update`,
    PROFILE: (category: string) => {
      return `/api/user/profile/${category}`;
    },
    PROJECT_JOIN_REQUEST: (approvalStatus: 'approve' | 'reject') => {
      return `/api/post/project/join/${approvalStatus}`;
    },
  },
  DELETE: {
    ACCOUNT: `/api/user/delete-account`,
    ACCOUNT_CONFIRM: `/api/user/delete-account/confirm`,
    PROJECT: `/api/post/project/delete`,
    NOTIFICATION: `/api/user/profile/notification/delete`,
    PROJECT_MEMBER: `/api/post/project/leave`,
  },
};

export const AUTH_ENDPOINTS = {
  SIGNIN: `/api/user/signin/email`,
  SIGNUP: `/api/user/signup`,
  EMAIL_VERIFY: `/api/auth/email/verify`,
  LOGOUT: `/api/user/logout`,
};
