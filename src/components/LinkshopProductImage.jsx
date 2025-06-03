import styled from 'styled-components';
const defalutProductImg = 'https://placehold.co/95x95';

const ProductImage = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 15px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
`;

function LinkshopProductImage({ src = defalutProductImg, name }) {
  return <ProductImage src={src} alt={name} />;
}
export default LinkshopProductImage;
