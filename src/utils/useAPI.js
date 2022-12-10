const { REACT_APP_API_KEY, REACT_APP_USERNAME } = process.env;
const requestUrl = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

const headers = {
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

export const auth = async () => {
  try {
    const token = sessionStorage.getItem('accessToken');
    if (token !== null) {
      headers.authorization = `Bearer ${token}`;
      const data = await fetch(`${requestUrl}/auth/me`, {
        method: 'POST',
        headers,
      });
      const json = await data.json();
      console.log(json);
      return json;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
