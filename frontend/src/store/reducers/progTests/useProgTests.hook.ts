import { useAppActions, useAppSelector } from '@src/store/useRedux.hook';
import { useEffect } from 'react';

export const useProgTests = () => {
  const { loading, error, data } = useAppSelector((state) => state.progTests);
  const { query, refetch } = useAppActions();

  useEffect(() => {
    query();
  }, [query]);

  return { loading, error, data, query, refetch };
};
