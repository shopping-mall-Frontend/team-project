import { Route, Routes } from 'react-router-dom';

import {
  MainPage,
  LoginPage,
  SignUpPage,
  CategoryPage,
  ProductPage,
  UserPage,
} from './pages/index';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};

export default App;
