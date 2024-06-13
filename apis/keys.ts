// const AUTH_USER_API_ENDPOINT = '/api/auth/user';
export const authUserKey = '/api/auth/user';

// main page
export const projectsKey = (page: number, order: 'new' | 'popularity') => {
  return `/api/post/projects?page=${page}&order=${order ?? 'new'}`;
};

// get bookmark ids
export const bookmarksStatusKey = () => {
  return `/api/post/bookmark/bookmarksStatus`;
};

// check bookmark status for a particular post
export const bookmarkStatusKey = (postId: string) => {
  return `/api/post/bookmark/bookmarkStatus/${postId}`;
};

// project detail page
export const PROJECT_DETAIL_API_ENDPOINT = '/api/post/project';

export const projectDetailKey = (postId: string) => {
  return `${PROJECT_DETAIL_API_ENDPOINT}/${postId}`;
};

// profile page
const PROFILE_API_ENDPOINT = '/api/user/profile';

export const userRegisteredCheckKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}/registeredCheck`;
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

export const profileNotificationsKey = (nickname: string) => {
  return `${PROFILE_API_ENDPOINT}/${nickname}?tab=viewNotifications`;
};

// search page
export const searchKey = (searchText: string) => {
  return `/api/search?q=${encodeURIComponent(searchText)}`;
};
