import type { AxiosHeaders } from 'axios';

export interface AxiosErrorData {
  success: boolean;
  message: string;
}

export interface FetcherParams {
  url: string;
  args?: {
    page: string;
    tag: string;
  };
  config?: AxiosHeaders;
}
