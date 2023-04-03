/**
 * @returns boolean - true인 경우 SSR, false인 경우 CSR
 */
const checkCSRSSR = () => {
  // CSR에서만 동작하는 코드
  if (typeof window !== 'undefined') {
    return false;
  }

  // SSR에서만 동작하는 코드
  if (typeof window === 'undefined') {
    return true;
  }
};

export default checkCSRSSR;
