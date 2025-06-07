import { useCallback, useEffect, useState } from 'react';

import { useOptimisticUpdate } from './useOptimisticUpdate';
import { createLike, deleteLike } from '../api/api';

export const useCardsData = initialCardData => {
  const [cards, setCards] = useState(initialCardData);

  const { execute: addLike } = useOptimisticUpdate(
    createLike,
    useCallback(id => {
      setCards(prevCards =>
        prevCards.map(cardItem =>
          cardItem.id === id
            ? { ...cardItem, isLiked: true, likes: cardItem.likes + 1 }
            : cardItem,
        ),
      );
    }, []),

    useCallback(id => {
      setCards(prevCards =>
        prevCards.map(cardItem =>
          cardItem.id === id
            ? { ...cardItem, isLiked: false, likes: cardItem.likes - 1 }
            : cardItem,
        ),
      );
    }, []),
  );

  const { execute: removeLike } = useOptimisticUpdate(
    deleteLike,
    useCallback(id => {
      setCards(prevCards =>
        prevCards.map(cardItem =>
          cardItem.id === id
            ? { ...cardItem, isLiked: false, likes: cardItem.likes - 1 }
            : cardItem,
        ),
      );
      console.log(cards);
    }, []),
    useCallback(id => {
      setCards(prevCards =>
        prevCards.map(cardItem =>
          cardItem.id === id
            ? { ...cardItem, isLiked: true, likes: cardItem.likes + 1 }
            : cardItem,
        ),
      );
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
    setCards(initialCardData);
  }, [initialCardData]);

  return {
    cards,
    handleToggleLike,
  };
};
