import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from './Card';
import NoSearchResult from './NoSearchResult';
import { useCardsData } from '../hooks/useCardsData';

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

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  min-width: 344px;
  @media (min-width: 768px) {
    width: calc(100% - 8px);
    min-width: 342px;
  }
  @media (min-width: 1024px) {
    width: calc((100% - 24px) / 2);
    max-width: 589px;
  }
`;

function CardList({ cardData: initialCardData, $isLoading }) {
  const { cards, handleToggleLike } = useCardsData(initialCardData);

  if (!$isLoading && cards.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <CardListWrapper>
      {cards.map(cardItem => (
        <StyledLink key={cardItem.id} to={`/link/${cardItem.userId}`}>
          <Card
            id={cardItem.id}
            name={cardItem.name}
            userId={cardItem.userId}
            imageUrl={cardItem.shop.imageUrl}
            likes={cardItem.likes}
            isLiked={cardItem.isLiked}
            productsCount={cardItem.productsCount}
            productImageSrcs={cardItem.products.map(
              product => product.imageUrl,
            )}
            onToggleLike={handleToggleLike}
          />
        </StyledLink>
      ))}
    </CardListWrapper>
  );
}

export default CardList;
