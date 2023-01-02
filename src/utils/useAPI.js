import axios from '../api/axios';

////////////////////// 인증 //////////////////////

// 사용자 수정
export const editUserInfo = async (value) => {
  try {
    const { newPassword, oldPassword, displayName } = value;
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const response = await axios.put(`/auth/user`, {
        displayName,
        oldPassword,
        newPassword,
      });
      // console.log(response);
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

// 회원가입
export const signup = async (value) => {
  //console.log(value);
  const { email, password, displayName } = value;

  try {
    const { data } = await axios.post('/auth/signup', {
      email,
      password,
      displayName,
    });

    localStorage.setItem('accessToken', data.accessToken);
    alert('🌺 환영합니다! 회원가입을 축하드립니다 !🌺');
    window.location.replace('/');
  } catch (err) {
    alert('회원가입에 실패했습니다.');
    console.log(err);
  }
};

// 로그인
export const signIn = async (value) => {
  try {
    const { email, password } = value;
    const { data } = await axios.post(`/auth/login`, {
      email,
      password,
    });
    const { accessToken } = data;

    localStorage.setItem('accessToken', accessToken);
    return data;
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
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.post(`/auth/${type}`);
      //console.log(data);
      return data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

////////////////////// 계좌 //////////////////////

// 계좌 관련 조회
export const getAccount = async (type = '') => {
  // type: banks => 선택 가능한 은행 목록 조회, 기본: 계좌 목록 및 잔액 조회
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.get(`/account/${type}`);
      // console.log(data);
      return data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

// 계좌 추가
export const accountAdd = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.post(`/account`, body);
      // console.log(data);
      return data;
    }
  } catch (err) {
    return err.response.data + '';
  }
};

// 계좌 해제
export const delAccount = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.delete(`/account`, {
        data: body,
      });
      // console.log(data);
      return data;
    }
  } catch (err) {
    return err.response.data + '';
  }
};

////////////////////// 제품 (관리자) //////////////////////

// 제품 추가
export const addProduct = async (key, list) => {
  try {
    list.price = parseInt(list.price, 10);
    if (key) {
      axios.defaults.headers.common['masterKey'] = true;
      const { data } = await axios.post(`/products`, JSON.stringify(list));
      return data;
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
      axios.defaults.headers.common['masterKey'] = true;
      const { data } = await axios.delete(`/products/${id}`);
      // console.log(data);
      return data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

////////////////////// 제품 (사용자) //////////////////////

// 제품 조회
export const getAllProduct = async (key) => {
  try {
    if (key) {
      axios.defaults.headers.common['masterKey'] = true;
      const { data } = await axios.get(`/products`);
      // console.log(data);
      return data;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
// 제품 상세 조회
export const getProductDetail = async (id) => {
  try {
    axios.defaults.headers.common['masterKey'] = true;
    const { data } = await axios.get(`/products/${id}`);
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 제품 검색
export const searchProduct = async (searchText = '', searchTags = []) => {
  try {
    const { data } = await axios.post(`/products/search`, {
      searchText,
      searchTags,
    });
    // console.log(data);
    return data;
  } catch (err) {
    return console.log(err.message);
  }
};

// 제품 구매 신청
export const buyProduct = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.post(`/products/buy `, body);
      // console.log(data);
    }
    return false;
  } catch (err) {
    return err.response.data + '';
  }
};

// 제품 거래(구매) 취소
export const refundProduct = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.post(`/products/cancel`, body);
      // console.log(data);
    }
    return false;
  } catch (err) {
    return err.response.data + '';
  }
};

// 제품 거래(구매) 확정
export const confirmProduct = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.post(`/products/ok`, body);
      // console.log(data);
    }
    return false;
  } catch (err) {
    return err.response.data + '';
  }
};

// 전체 제품 거래(구매) 내역
export const orderedProducts = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.get(`/products/transactions/details`);
      // console.log(data);
      return data;
    }
  } catch (err) {
    return err.response.data + '';
  }
};

// 단일 제품 상세 거래(구매) 내역
export const orderedProduct = async (body = '') => {
  try {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      const { data } = await axios.post(`/products/transactions/detail`, body);
      // console.log(data);
      return data;
    }
  } catch (err) {
    return err.response.data + '';
  }
};
