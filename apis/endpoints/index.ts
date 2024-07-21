export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

export const ENDPOINTS = {
  GET: {
    PROJECT_OVERVIEWS: (page: number, order: 'new' | 'popularity') => {
      return `/api/post/projectOverviews?page=${page}&order=${order ?? 'new'}`;
    },
  },
  CREATE: {},
  UPDATE: {},
  DELETE: {},
};
