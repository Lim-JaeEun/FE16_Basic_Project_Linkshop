import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './layouts/Header';
import CreateShopPage from './pages/CreateShopPage';
import DetailShopPage from './pages/DetailShopPage';
import MainPage from './pages/MainPage';
import UpdateShopPage from './pages/UpdateShopPage';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Header />}>
          {/* 메인 페이지 */}
          <Route path='/list' element={<MainPage />}></Route>
          {/* 상세 페이지 */}
          <Route path='/link/:URLid' element={<DetailShopPage />}></Route>
        </Route>
        {/* 생성 페이지 */}
        <Route path='/linkpost' element={<CreateShopPage />}></Route>
        {/* 수정 페이지 */}
        <Route path='/link/:URLid/edit' element={<UpdateShopPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
