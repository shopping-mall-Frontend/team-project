const { REACT_APP_API_KEY, REACT_APP_USERNAME } = process.env;
const requestUrl = 'api';

const headers = {
  Accept: 'application/json',
  'content-type': 'application/json',
  apikey: REACT_APP_API_KEY,
  username: REACT_APP_USERNAME,
};

//로그인
export const signIn = async (value) => {
  try {
    console.log(value);
    const token = sessionStorage.getItem('accessToken');
    const { email, password } = value;
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
    }

    const data = await fetch(`${requestUrl}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await data.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
};

// 로그인 인증 확인, 로그아웃을 type에 따라 결정
export const auth = async (type = 'me') => {
  // type: me => 인증 확인, logout => 로그아웃
  try {
    const token = sessionStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const data = await fetch(`${requestUrl}/auth/${type}`, {
        method: 'POST',
        headers,
      });
      const json = await data.json();
      console.log(json);
      return json;
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
    const token = sessionStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const data = await fetch(`${requestUrl}/account/${type}`, {
        method: 'GET',
        headers,
      });
      const json = await data.json();
      console.log(json);
      return json;
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
      const data = await fetch(`${requestUrl}/products`, {
        method: 'GET',
        headers,
      });
      const json = await data.json();
      console.log(json);
      return json;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 제품 추가
export const addProduct = async (key, list) => {
  try {
    list.price = parseInt(list.price);
    list.tags = list.tags.split(' ');
    if (key) {
      headers.masterKey = true;
      const data = await fetch(`${requestUrl}/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(list),
      });
      console.log(data);
      const json = await data.json();
      console.log(json);
      return json;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 제품 삭제
export const deleteProduct = async (key, id) => {
  try {
    if (key) {
      headers.masterKey = true;
      const data = await fetch(`${requestUrl}/products/${id}`, {
        method: 'DELETE',
        headers,
      });
      const json = await data.json();
      console.log(json);
      return json;
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
    const data = await fetch(`${requestUrl}/products/${id}`, {
      method: 'GET',
      headers,
    });
    const json = await data.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
};
