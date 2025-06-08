import { useState, useCallback } from 'react';

export const useAsync = (
  asyncFunction,
  { delayLoadingTransition = false, delayLoadingTime = 500 },
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        if (delayLoadingTransition) {
          setTimeout(() => {
            setIsLoading(false);
          }, delayLoadingTime);
        } else {
          setIsLoading(false);
        }
      }
    },
    [asyncFunction, delayLoadingTransition, delayLoadingTime],
  );

  return { execute, data, isLoading, error };
};
