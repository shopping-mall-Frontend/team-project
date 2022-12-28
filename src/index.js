import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/config';
const GlobalStyle = createGlobalStyle`
  // reset css
  ${reset}
  // 전역 css 설정
  body {
    font: 15px sans-serif, Futura, 'Century Gothic';
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);
