import axios from 'axios';
import { AxiosErrorData } from '@/apis/types';
import { KeyedMutator } from 'swr';

export const errorMessage = <T>(error: unknown, mutate?: KeyedMutator<T>) => {
  if (axios.isAxiosError<AxiosErrorData>(error)) {
    if ((error.response?.status === 409, mutate)) {
      mutate();
    }

    return alert(error.response?.data.message);
  } else {
    return alert('죄송합니다. 오류가 발생했습니다. 나중에 다시 시도해주세요.');
  }
};
