import axios from 'axios';

// eslint-disable-next-line no-undef
let url = process.env.REACT_APP_URI_BACKEND;

const login = async (credentials) => {
  const finalUrl = url + 'auth/login';
  return axios
    .post(finalUrl, credentials)
    .then((res) => {
      if (res.data && res.data.token) {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        sessionStorage.setItem('user', JSON.stringify(res.data.data));
      }
      return res.data;
    });
};

const register = async (credentials) => {
  const finalUrl = url + 'auth/register';
  return axios
    .post(finalUrl, credentials)
    .then((res) => res.data);
};

const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

const authService = {
  login,
  register,
  logout
};

export default authService;

