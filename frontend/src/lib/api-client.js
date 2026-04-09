import axios from 'axios';
import { clearAuthTokens, getAccessToken } from '@/lib/auth-storage';
import { refreshAccessToken } from '@/lib/services/auth-service';

const API_BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Access token attacher
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error?.response?.status;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshableAuthError = statusCode === 401 || statusCode === 403;
    const isAlreadyRetried = Boolean(originalRequest._retry);

    if (!isRefreshableAuthError || isAlreadyRetried) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
