import { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import Card from './Card';
import NoSearchResult from './NoSearchResult';
import { createLike, deleteLike } from '../api/api';

const CardListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 16px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 24px;
  }
`;

function CardList({ cardData: initialCardData, isLoading }) {
  const [cards, setCards] = useState(initialCardData); // 카드 리스트 상태 관리

  useEffect(() => {
    setCards(initialCardData);
  }, [initialCardData]);

  const handleToggleLike = useCallback(async (id, currentIsLiked) => {
    // 1. UI를 즉시 업데이트 (낙관적 업데이트)
    setCards(prevCards =>
      prevCards.map(cardItem =>
        cardItem.id === id
          ? {
              ...cardItem,
              isLiked: !currentIsLiked,
              likes: currentIsLiked ? cardItem.likes - 1 : cardItem.likes + 1,
            }
          : cardItem,
      ),
    );

    try {
      if (!currentIsLiked) await createLike(id);
      else await deleteLike(id);
    } catch (error) {
      console.error('좋아요 API 호출 실패:', error);
      // 2. API 호출 실패 시 UI를 이전 상태로 롤백
      setCards(prevCards =>
        prevCards.map(cardItem =>
          cardItem.id === id
            ? {
                ...cardItem,
                isLiked: currentIsLiked, // 원래 상태로 되돌림
                likes: currentIsLiked ? cardItem.likes + 1 : cardItem.likes - 1, // 원래 개수로 되돌림
              }
            : cardItem,
        ),
      );
    }
  }, []);

  if (!isLoading && cards.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <CardListWrapper>
      {cards.map(cardItem => (
        <Card
          key={cardItem.id}
          id={cardItem.id}
          name={cardItem.name}
          userId={cardItem.userId}
          imageUrl={cardItem.shop.imageUrl}
          likes={cardItem.likes}
          isLiked={cardItem.isLiked}
          productsCount={cardItem.productsCount}
          productImageSrcs={cardItem.products.map(product => product.imageUrl)}
          onToggleLike={handleToggleLike}
        />
      ))}
    </CardListWrapper>
  );
}

export default CardList;
