import axios from "axios";

const { REACT_APP_API_KEY, REACT_APP_USERNAME } = process.env;
const requestUrl = 'api';

export const headers = {
  Accept: 'application/json',
  'content-type': 'application/json',
  apikey: REACT_APP_API_KEY,
  username: REACT_APP_USERNAME,
};

//로그인
export const signIn = async (value) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { email, password } = value;
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
    }

    const res = await axios.post(`${requestUrl}/auth/login`,JSON.stringify({email,password}) , {headers,})
    const { accessToken } = res.data;

    localStorage.setItem('accessToken', accessToken);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// 로그인 인증 확인, 로그아웃을 type에 따라 결정
export const auth = async (type = 'me') => {
  // type: me => 인증 확인, logout => 로그아웃
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const res = await axios.post(`${requestUrl}/auth/${type}`,{},{headers});
      console.log(res.data);
      return res.data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 계좌 관련 조회
export const getAccount = async (type = '') => {
  // type: banks => 선택 가능한 은행 목록 조회, 기본: 계좌 목록 및 잔액 조회
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const res = await axios.get(`${requestUrl}/account/${type}`, {headers});
      return res.data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 제품 조회
export const getAllProduct = async (key) => {
  try {
    if (key) {
      headers.masterKey = true;
      const res = await axios.get(`${requestUrl}/products`, {headers});
      return res.data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 제품 추가
export const addProduct = async (key, list) => {
  try {
    list.price = parseInt(list.price, 10);
    if (key) {
      headers.masterKey = true;
      const res = await axios.post(`${requestUrl}/products`, JSON.stringify(list) ,{headers})
      return res.data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
  return true;
};

// 제품 삭제
export const deleteProduct = async (key, id) => {
  try {
    if (key) {
      headers.masterKey = true;
      const res = await axios.delete(`${requestUrl}/products/${id}`, {headers});
      console.log(res);
      return res.data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 제품 상세 조회
export const getProductDetail = async (id) => {
  try {
    headers.masterKey = true;
    const res = await axios.get(`${requestUrl}/products/${id}`, {headers});
    console.log(res)
    return res.data
  } catch (err) {
    console.log(err);
  }
};

// 계좌 추가
export const accountAdd = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const res = await axios.post(`${requestUrl}/account`, body ,{headers})
      console.log(res);
    }
  } catch (err) {
    return 'string'
  }
};

// 제품 구매
export const buyProduct = async ( body = '' ) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const res = await axios.post(`${requestUrl}/products/buy `,body ,{headers})
      console.log(res)
    }
    return false;  
  } catch (err) {
    console.log(err);
  }
};

// 계좌 해제
export const delAccount = async ( body = '' ) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      await axios.delete(`${requestUrl}/account`, {
        headers,
        data : body
      });
    }
  } catch(err) {
    return err.response.data + ''
  }  
};


