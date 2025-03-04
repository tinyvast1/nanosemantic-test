import { useEffect, useState } from 'react';
import { IUseMutationOptions, useMutation } from './useMutation';

interface IUseQueryOption<P, T> extends IUseMutationOptions<P, T> {
  enabled?: boolean;
  payload: P;
}

export function useQuery<P, T>({
  enabled = true,
  payload,
  ...mutateOptions
}: IUseQueryOption<P, T>) {
  const [isLoading, setIsLoading] = useState(enabled ? true : false);
  const { mutateAsync, ...restData } = useMutation(mutateOptions);

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);

      mutateAsync(payload).finally(() => {
        setIsLoading(false);
      });
    }
  }, [enabled, payload]);

  return {
    isLoading,
    ...restData,
  };
}

