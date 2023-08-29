import useSWR, { Middleware, SWRHook } from 'swr';

export const serialize: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    // Serialize the key.
    const serializedKey = typeof key === 'string' ? key : JSON.stringify(key);

    // Pass the serialized key, and unserialize it in fetcher.
    return useSWRNext(
      serializedKey,
      fetcher ? (k: string) => fetcher({ ...JSON.parse(k) }) : null,
      config,
    );
  };
