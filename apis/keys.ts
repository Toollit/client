// const AUTH_USER_API_ENDPOINT = '/api/auth/user';
export const authUserKey = '/api/auth/user';

// main page
export const projectsKey = (page: number, order: 'new' | 'popularity') => {
  return `/api/post/projects?page=${page}&order=${order ?? 'new'}`;
};

export const projectsBookmarksStatusKey = () => {
  return `/api/post/projects/checkBookmark`;
};

// project detail page
export const PROJECT_DETAIL_API_ENDPOINT = '/api/post/project';

export const getProjectDetailKey = (postId: string) => {
  return `${PROJECT_DETAIL_API_ENDPOINT}/${postId}`;
};

export const getProjectDetailBookmarkCheckKey = (postId: string) => {
  return `${PROJECT_DETAIL_API_ENDPOINT}/${postId}/checkBookmark`;
};

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
