import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  MainPage,
  LoginPage,
  SignUpPage,
  CategoryPage,
  ProductPage,
  ProductdetailsPage,
  CartPage,
  OrderPage,
  UserPage,
} from './pages/index';
import { getAllProduct } from './utils/useAPI';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [cart, setCart] = useState([]);

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
      <Route path="/category/:category" element={<CategoryPage products={categoryItems} />} />
      <Route path="/product" element={<ProductPage products={products} setProducts={setProducts} />} />
      <Route path="/product/:id" element={<ProductdetailsPage cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/order" element={<OrderPage cart={cart} setCart={setCart} />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};

export default App;
