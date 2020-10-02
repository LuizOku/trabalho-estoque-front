import axios from "axios";

const api = axios.create({
  baseURL: "https://security-module-saas.herokuapp.com",
});

api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

api.interceptors.request.use(
  (request) => {
    const authStorage = localStorage.getItem('auth-estoque');
    if (authStorage) {
      request.headers.authorization = authStorage;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;
