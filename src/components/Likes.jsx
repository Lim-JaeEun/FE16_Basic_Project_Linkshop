import styled from 'styled-components';

import emptyHeartImg from '../assets/icon/btn_empty_heart.png';
import filledHeartImg from '../assets/icon/btn_fill_heart.png';
import { FontTypes } from '../styles/theme';
import { applyFontStyles } from './../styles/mixins';

const DEFAULT_HEART_SIZE = '24px';

const StLikesWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const StHeartImg = styled.img`
  aspect-ratio: 1/1;
`;
const StLikesCount = styled.p`
  ${applyFontStyles(FontTypes.BOLD16)}
`;

const Likes = ({ onClick: handleClick, likes, isLiked = false }) => {
  const src = isLiked ? filledHeartImg : emptyHeartImg;

  return (
    <StLikesWrapper onClick={handleClick}>
      <StHeartImg
        src={src}
        alt={'좋아요 이미지 버튼'}
        width={DEFAULT_HEART_SIZE}
      />
      <StLikesCount>{likes}</StLikesCount>
    </StLikesWrapper>
  );
};

export default Likes;
