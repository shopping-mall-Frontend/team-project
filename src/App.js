import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { getAllProduct } from './utils/useAPI';

import {
  MainPage,
  LoginPage,
  SignUpPage,
  CategoryPage,
  ProductdetailsPage,
  CartPage,
  OrderPage,
  UserPage,
  OrderConfirmedPage,
} from './pages/index';
import SearchPage from './pages/SearchPage';
import {
  OrderHistory,
  OrderHistoryDetails,
  CancelHistory,
  BankAccounts,
  EditProfile,
  AuthPassword,
} from './pages/User/index';

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
      <Route path="/orderconfirmed" element={<OrderConfirmedPage />} />
      <Route path="/user" element={<UserPage />}>
        <Route index element={<OrderHistory />} />
        <Route path="order/:id" element={<OrderHistoryDetails />} />
        <Route path="cancelhistory" element={<CancelHistory />} />
        <Route path="bankaccounts" element={<AuthPassword />} />
        <Route path="bankaccounts/edit" element={<BankAccounts />} />
        <Route path="editprofile" element={<AuthPassword />} />
        <Route path="editprofile/edit" element={<EditProfile />} />
      </Route>
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
