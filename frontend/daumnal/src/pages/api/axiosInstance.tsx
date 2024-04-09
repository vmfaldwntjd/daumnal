import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function(config: InternalAxiosRequestConfig) {
    // headers가 undefined일 가능성에 대비한 코드 제거

    const token: string | null = localStorage.getItem('memberAccessToken');
    if (token) {
      // Authorization 헤더 설정 전 headers 객체가 존재하는지 확인
      // 이제 headers 객체가 항상 초기화되어 있으므로, 직접 초기화할 필요 없음
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  function(response: AxiosResponse) {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      // axios.defaults.headers.common 대신 axiosInstance의 인스턴스를 사용하여 헤더 설정
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken(): Promise<string> {
  // 리프레시 토큰을 로컬 스토리지에서 가져옵니다.
  const refreshToken: string | null = localStorage.getItem('memberRefreshToken');

  // console.log(refreshToken)

  const response = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/reissue`,
    headers: {
      Authorization: `Bearer ${refreshToken}` // 수정된 부분
    },
  });
  
  const newAccessToken = response.data.data.accessToken;

  // 새로운 액세스 토큰을 로컬 스토리지에 저장합니다.
  localStorage.setItem('memberAccessToken', newAccessToken);

  return newAccessToken;
}


export default axiosInstance;
