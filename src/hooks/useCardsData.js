import { useCallback, useEffect, useState } from 'react';

import { useOptimisticUpdate } from './useOptimisticUpdate';
import { createLike, deleteLike } from '../api/api';

export const useCardData = cardData => {
  const [card, setCard] = useState(cardData);
  const productImageSrcs = cardData.products.map(product => product.imageUrl);

  const { execute: addLike } = useOptimisticUpdate(
    createLike,
    useCallback(
      id =>
        setCard(prevCard => ({
          ...prevCard,
          isLiked: true,
          likes: prevCard.likes + 1,
        })),
      [],
    ),
    useCallback(
      id =>
        setCard(prevCard => ({
          ...prevCard,
          isLiked: false,
          likes: prevCard.likes - 1,
        })),
      [],
    ),
  );

  const { execute: removeLike } = useOptimisticUpdate(
    deleteLike,
    useCallback(
      id =>
        setCard(prevCard => ({
          ...prevCard,
          isLiked: false,
          likes: prevCard.likes - 1,
        })),
      [],
    ),
    useCallback(
      id =>
        setCard(prevCard => ({
          ...prevCard,
          isLiked: true,
          likes: prevCard.likes + 1,
        })),
      [],
    ),
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

  return {
    card: { ...card, productImageSrcs },
    handleToggleLike,
  };
};
