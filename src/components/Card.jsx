import styled from 'styled-components';

import LinkshopProductImage from './LinkshopProductImage';
import LinkshopProfileInfo from './LinkshopProfileInfo';
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
    width: calc(50% - 12px);
  }
`;
const ProductImgWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  /* WebKit 기반 브라우저 (Chrome, Safari, Edge) 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 트랙 자체를 숨김 */
    width: 0; /* 폭을 0으로 설정하여 공간 차지하지 않게 함 */
    height: 0; /* 높이를 0으로 설정하여 공간 차지하지 않게 함 */
  }

  /* Firefox 스크롤바 숨기기 (또는 얇게 만들기) */
  scrollbar-width: thin;
  -ms-overflow-style: none; /* IE 및 Edge (레거시) 스크롤바 숨기기 */
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
