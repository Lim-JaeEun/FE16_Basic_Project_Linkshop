import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from './Card';
import NoSearchResult from './NoSearchResult';

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

function CardList({ cardData, $isLoading }) {
  if (!$isLoading && cardData.length === 0) {
    return <NoSearchResult />;
  }

  return (
    <CardListWrapper>
      {cardData.map(cardItem => (
        <StyledLink key={cardItem.id} to={`/link/${cardItem.userId}`}>
          <Card cardData={cardItem} />
        </StyledLink>
      ))}
    </CardListWrapper>
  );
}

export default CardList;
