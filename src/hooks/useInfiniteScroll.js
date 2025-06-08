import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  onIntersect,
  hasMore,
  isLoading,
  intersectionOptions = {},
) => {
  const observerTargetRef = useRef(null); // 감지할 요소를 위한 ref
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1,
  } = intersectionOptions;

  useEffect(() => {
    const observerTarget = observerTargetRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(observerTarget);

    return () => {
      observer.disconnect();
    };
  }, [
    observerTargetRef,
    onIntersect,
    hasMore,
    isLoading,
    root,
    rootMargin,
    threshold,
  ]);

  return observerTargetRef;
};
