import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import CreateShopPage from './pages/CreateShopPage';
import DetailShopPage from './pages/DetailShopPage';
import MainPage from './pages/MainPage';
import UpdateShopPage from './pages/UpdateShopPage';
import GlobalStyle from './styles/GlobalStyle';
import Toast from './Toast';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

const App = () => {
  const [toastMessage, setToastMessage] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toast message={toastMessage} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            {/* 메인 페이지로 리다이렉트 */}
            <Route index element={<Navigate to={'/list'} replace={true} />} />

            {/* 메인 페이지 */}
            <Route path='/list' element={<MainPage />} />

            {/* 생성 페이지 */}
            <Route
              path='/linkpost'
              element={
                <CreateShopPage
                  onSuccess={() => setToastMessage('생성 완료')}
                />
              }
            />

            {/* 수정 페이지 */}
            <Route
              path='/link/:URLid/edit'
              element={
                <UpdateShopPage
                  onSuccess={() => setToastMessage('수정 완료')}
                />
              }
            />
          </Route>
          {/* --- Header 레이아웃 그룹 끝 --- */}

          {/* 상세 페이지 */}
          <Route path='/link/:URLid' element={<DetailShopPage />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;