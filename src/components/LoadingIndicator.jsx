import styled, { css, keyframes } from 'styled-components';

import { applyFontStyles } from '../styles/mixins';
import { ColorTypes, FontTypes } from '../styles/theme';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid
    ${({ theme }) => theme.colors[ColorTypes.SECONDARY_GRAY_100]}; /* 밝은 회색 테두리 */
  border-top: 4px solid
    ${({ theme }) => theme.colors[ColorTypes.SECONDARY_BLACK]}; /* 파란색 상단 테두리 (회전 시 보일 부분) */
  border-radius: 50%; /* 원형 */
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s cubic-bezier(0.9, 0.3, 0.3, 0.9) infinite;
`;

// 최초 로딩 시 블러처리
const centerIndicatorStyles = css`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); /* 사파리 지원을 위한 접두사 */
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $isLoading }) => {
    return (
      !$isLoading &&
      css`
        visibility: hidden;
      `
    );
  }}

  ${({ $isInitialLoad }) => $isInitialLoad && centerIndicatorStyles}
  padding: ${({ $isInitialLoad }) => ($isInitialLoad ? 0 : '32px 0')};
`;

const NoMoreDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 114px;

  ${applyFontStyles(FontTypes.REGULAR16, ColorTypes.SECONDARY_GRAY_200)}
`;

const LoadingIndicator = ({
  $isLoading,
  $hasMore,
  $isEmptyList,
  $isInitialLoad,
}) => {
  return $hasMore ? (
    <IndicatorContainer $isLoading={$isLoading} $isInitialLoad={$isInitialLoad}>
      <Spinner />
    </IndicatorContainer>
  ) : (
    !$isEmptyList && (
      <NoMoreDataContainer>{'모든 콘텐츠를 불러왔어요 :)'}</NoMoreDataContainer>
    )
  );
};

export default LoadingIndicator;
