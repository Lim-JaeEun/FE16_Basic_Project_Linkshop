import styled from 'styled-components';

import Card from './Card';
const CardListWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 15px 8px;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
  @media (min-width: 1024px) {
    width: 1199px;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

function CardList({ cardData, onClick: handleClick }) {
  if (cardData === null) {
    return (
      <CardListWrapper>
        <div>표시할 카드가 없습니다.</div>
      </CardListWrapper>
    );
  }

  return (
    <CardListWrapper>
      {cardData.map(cardItem => (
        <Card
          key={cardItem.id}
          name={cardItem.name}
          userId={cardItem.userId}
          imageUrl={cardItem.shop.imageUrl}
          likes={cardItem.likes}
          isLiked={false}
          onClick={handleClick}
          productsCount={cardItem.productsCount}
          productImageSrcs={cardItem.products.map(product => product.imageUrl)}
        />
      ))}
    </CardListWrapper>
  );
}

export default CardList;
