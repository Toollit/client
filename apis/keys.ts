export const AUTH_USER = '/api/auth/user';

export const GET_PROJECTS_API_ENDPOINT = '/api/post/projects?page=1';
export const getProjectsKey = (
  page?: number,
  order?: 'new' | 'popularity' | null,
) => {
  if (!page) {
    return `/api/post/projects?page=1&order=${order ?? 'new'}`;
  }
  return `/api/post/projects?page=${page}&order=${order ?? 'new'}`;
};

/** 뒤에 /postId 를 전달해야한다. */
export const GET_PROJECT_DETAIL_API_ENDPOINT = '/api/post/project';

export const GET_USER_PROFILE_API_ENDPOINT = '/api/user/profile';
