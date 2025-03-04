import { useState } from 'react';

export interface IUseMutationOptions<P, T> {
  queryFn: (payload: P) => Promise<T>;
  onSuccess?: (data: T) => void;
  onMutate?: (data: P) => void;
}

export function useMutation<P, T>({
  queryFn,
  onSuccess,
  onMutate,
}: IUseMutationOptions<P, T>) {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setIsData] = useState<T | undefined>(undefined);

  const mutateAsync = async (payload: P) => {
    setError(undefined);
    setIsError(false);
    setIsPending(true);

    onMutate?.(payload);

    return queryFn(payload)
      .then((data) => {
        onSuccess?.(data);
        setIsData(data);

        return data;
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setError(err?.data?.result?.message || 'Произошла ошибка');
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return {
    mutateAsync,
    isPending,
    isError,
    error,
    data,
  };
}

