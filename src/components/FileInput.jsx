import styled from 'styled-components';
import theme, { ColorTypes } from '../styles/theme';

const Wrapper = styled.div``;

const Button = styled.button`
  border: 1px solid ${theme.colors[ColorTypes.PRIMARY]};
  background-color: transparent;
  border-radius: 8px;
  padding: 7px 12px;

  // 전역스타일 변경 시 REGULAR14로 변경 필요 !
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors[ColorTypes.PRIMARY]};
`;

const FileInput = () => {
  return (
    <Wrapper>
      <Button>파일 첨부</Button>
    </Wrapper>
  );
};

export default FileInput;
