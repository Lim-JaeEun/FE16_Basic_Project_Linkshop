import { useCallback, useEffect, useState } from 'react';

import { useOptimisticUpdate } from './useOptimisticUpdate';
import { createLike, deleteLike } from '../api/api';

export const useCardData = cardData => {
  const storedValue =
    window.localStorage.getItem(`cardIsLiked_${cardData.id}`) ?? 'false';

  const [card, setCard] = useState(cardData);
  const [isLiked, setIsLiked] = useState(storedValue === 'true');
  const productImageSrcs = cardData.products.map(product => product.imageUrl);

  const { execute: addLike } = useOptimisticUpdate(
    createLike,
    useCallback(() => {
      setIsLiked(true);
      setCard(prevCard => ({
        ...prevCard,
        likes: prevCard.likes + 1,
      }));
    }, []),
    useCallback(() => {
      setIsLiked(false);
      setCard(prevCard => ({
        ...prevCard,
        likes: prevCard.likes - 1,
      }));
    }, []),
  );

  const { execute: removeLike } = useOptimisticUpdate(
    deleteLike,
    useCallback(() => {
      setIsLiked(false);
      setCard(prevCard => ({
        ...prevCard,
        likes: prevCard.likes - 1,
      }));
    }, []),
    useCallback(() => {
      setIsLiked(true);
      setCard(prevCard => ({
        ...prevCard,
        likes: prevCard.likes + 1,
      }));
    }, []),
  );

  const handleToggleLike = useCallback(
    async (id, currentIsLiked) => {
      try {
        if (!currentIsLiked) {
          await addLike(id);
        } else {
          await removeLike(id);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [addLike, removeLike],
  );

  useEffect(() => {
    setCard(cardData);
  }, [cardData]);

  useEffect(() => {
    window.localStorage.setItem(`cardIsLiked_${cardData.id}`, String(isLiked));
  }, [isLiked]);

  return {
    card: { ...card, isLiked, productImageSrcs },
    handleToggleLike,
  };
};
