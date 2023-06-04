import axios from 'axios';
import { AxiosErrorData } from '@/apis/types';

export const errorMessage = (error: unknown) => {
  if (axios.isAxiosError<AxiosErrorData>(error)) {
    return alert(error.response?.data.message);
  } else {
    return alert('죄송합니다. 오류가 발생했습니다. 나중에 다시 시도해주세요.');
  }
};
