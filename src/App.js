import { Outlet, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  MainPage,
  LoginPage,
  SignUpPage,
  CategoryPage,
  ProductdetailsPage,
  CartPage,
  OrderPage,
  UserPage,
} from './pages/index';
import { getAllProduct } from './utils/useAPI';
import SearchPage from './pages/SearchPage';

const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const newData = await getAllProduct(true);
      setCategoryItems(newData);
    };
    getProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage products={products} setProducts={setProducts} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category/:category/:brand" element={<CategoryPage products={categoryItems} />} />
      <Route path="/category/:category" element={<CategoryPage products={categoryItems} />} />
      <Route path="/product/:id" element={<ProductdetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/user/:menu" element={<UserPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
