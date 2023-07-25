const AUTH_USER_API_ENDPOINT = '/api/auth/user';

export const authUserKey = (): string => {
  return AUTH_USER_API_ENDPOINT;
};

export const GET_PROJECTS_API_ENDPOINT = '/api/post/projects?page=1';
export const getProjectsKey = (page: number, order: 'new' | 'popularity') => {
  return `/api/post/projects?page=${page}&order=${order ?? 'new'}`;
};

/** 뒤에 /postId 를 전달해야한다. */
export const GET_PROJECT_DETAIL_API_ENDPOINT = '/api/post/project';

// profile page
const PROFILE_API_ENDPOINT = '/api/user/profile';

export const getProfileImageKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}`;
};

export const getProfileInfoKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewProfile`;
};

export const getProfileProjectsKey = (nickname: string, count: number) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewProjects&count=${count}`;
};
