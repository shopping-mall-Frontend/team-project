const { API_KEY, USERNAME } = process.env;
const requestUrl = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

const headers = {
  'content-type': 'application/json',
  apikey: API_KEY,
  username: USERNAME,
};

//로그인
export const login = async (email, password) => {
  try {
    const token = sessionStorage.getItem('accessToken');
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
    console.log('로그인 성공!');
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
};
