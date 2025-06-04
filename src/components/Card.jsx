import styled from 'styled-components';

import LinkshopProductImage from './LinkshopProductImage';
import LinkshopProfileInfo from './LinkshopProfileInfo ';
import { applyFontStyles } from '../styles/mixins';
import { FontTypes } from '../styles/theme';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.secWhite100};
  border-radius: 25px;
  padding: 24px;
  @media (min-width: 1024px) {
    width: 587px;
  }
`;
const ProductImgWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
  overflow: scroll;
`;
const TotalProducts = styled.div`
  ${({ $fontType = FontTypes.REGULAR16 }) => applyFontStyles($fontType)};
`;
function Card({
  onClick: handleClick,
  name,
  userId,
  imageUrl,
  likes,
  isLiked,
  productsCount,
  productImageSrcs,
}) {
  return (
    <CardWrapper>
      <LinkshopProfileInfo
        onClick={handleClick}
        userId={userId}
        name={name}
        imageUrl={imageUrl}
        likes={likes}
        isLiked={isLiked}
      />
      <TotalProducts>대표상품 {productsCount}</TotalProducts>
      <ProductImgWrapper>
        {productImageSrcs.map((src, index) => (
          <LinkshopProductImage key={index} src={src} name={name} />
        ))}
      </ProductImgWrapper>
    </CardWrapper>
  );
}
export default Card;
