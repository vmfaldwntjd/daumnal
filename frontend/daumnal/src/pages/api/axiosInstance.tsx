// axiosInstance.ts
import axios, { AxiosInstance } from 'axios';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  function (config) {
    // 토큰을 localStorage에서 가져옴
    const token: string | null = localStorage.getItem('memberAccessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;