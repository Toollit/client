// const AUTH_USER_API_ENDPOINT = '/api/auth/user';
export const authUserKey = '/api/auth/user';

// main page
export const projectsKey = (page: number, order: 'new' | 'popularity') => {
  return `/api/post/projects?page=${page}&order=${order ?? 'new'}`;
};

export const projectsBookmarksStatusKey = () => {
  return `/api/post/projects/bookmarkStatus`;
};

// project detail page
export const PROJECT_DETAIL_API_ENDPOINT = '/api/post/project';

export const projectDetailKey = (postId: string) => {
  return `${PROJECT_DETAIL_API_ENDPOINT}/${postId}`;
};

export const projectDetailBookmarkStatusKey = (postId: string) => {
  return `${PROJECT_DETAIL_API_ENDPOINT}/${postId}/bookmarkStatus`;
};

// profile page
const PROFILE_API_ENDPOINT = '/api/user/profile';

export const userExistCheckKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}/existCheck`;
};

export const profileImageKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}/profileImage`;
};

export const profileInfoKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewProfile`;
};

export const profileProjectsKey = (nickname: string, count: number) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewProjects&count=${count}`;
};

export const profileBookmarksKey = (nickname: string, count: number) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewBookmarks&count=${count}`;
};

export const profileAlarmsKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewAlarms`;
};
