import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif,
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  ul, ol {
    list-style: none; 
  }
`;

export default GlobalStyle;
