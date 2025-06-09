import { useState, useCallback } from 'react';

export const useOptimisticUpdate = (
  asyncFunction,
  onOptimisticUpdate,
  onRollback,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        onOptimisticUpdate(...args);
        await asyncFunction(...args);
      } catch (error) {
        setError(error);
        onRollback(...args);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, onOptimisticUpdate, onRollback],
  );

  return { isLoading, error, execute };
};
