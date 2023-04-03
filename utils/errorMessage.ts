import axios from 'axios';
import { AxiosErrorData } from '@/apis/types';

export const errorMessage = (error: unknown) => {
  if (axios.isAxiosError<AxiosErrorData>(error)) {
    return alert(error.response?.data.message);
  }
};
