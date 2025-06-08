import { useState } from 'react';

import styled, { keyframes } from 'styled-components';

import emptyHeartImg from '../assets/icon/btn_empty_heart.png';
import filledHeartImg from '../assets/icon/btn_fill_heart.png';
import { FontTypes } from '../styles/theme';
import { applyFontStyles } from './../styles/mixins';

const DEFAULT_HEART_SIZE = '24px';

// 클릭시 통통튀는 키프레임
const bounce = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.3); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const StLikesWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.3125rem;
  cursor: pointer;
`;

const StHeartImg = styled.img`
  aspect-ratio: 1/1;
  animation: ${({ $isBouncing }) => ($isBouncing ? bounce : 'none')} 0.4s ease;
`;

const StLikesCount = styled.p`
  ${applyFontStyles(FontTypes.BOLD16)}
`;

const Likes = ({
  className,
  id,
  isLiked,
  onToggleLike: handleToggleLike,
  likes,
}) => {
  const [isBouncing, setIsBouncing] = useState(false); // 통통튀는 하트 애니메이션 state
  const src = isLiked ? filledHeartImg : emptyHeartImg;

  const handleToggleLikeClick = e => {
    e.preventDefault();
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400); // 애니메이션 끝나면 초기화

    handleToggleLike(id, isLiked);
  };

  return (
    <StLikesWrapper className={className} onClick={handleToggleLikeClick}>
      <StHeartImg
        src={src}
        alt={'좋아요 이미지 버튼'}
        width={DEFAULT_HEART_SIZE}
        loading='lazy'
        $isBouncing={isBouncing}
      />
      <StLikesCount>{likes}</StLikesCount>
    </StLikesWrapper>
  );
};

export default Likes;
