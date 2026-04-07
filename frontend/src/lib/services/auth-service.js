import axios from 'axios';
import { API_BASE_URL } from '@/lib/config';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  getUserEmail,
  setAuthTokens,
  setUserEmail,
} from '@/lib/auth-storage';

const authHttp = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

function normalizeAuthPayload(payload) {
  return {
    userId: payload?.user_id || null,
    email: payload?.email || null,
    accessToken: payload?.accessToken || null,
    refreshToken: payload?.refreshToken || null,
  };
}

export async function registerUser(formData) {
  const response = await authHttp.post('/api/auth/register', formData);
  const authData = normalizeAuthPayload(response.data);

  if (authData.accessToken && authData.refreshToken) {
    setAuthTokens(authData);
    setUserEmail(authData.email);
  }

  return authData;
}

export async function loginUser(formData) {
  const response = await authHttp.post('/api/auth/login', formData);
  const authData = normalizeAuthPayload(response.data);

  if (authData.accessToken && authData.refreshToken) {
    setAuthTokens(authData);
    setUserEmail(authData.email);
  }

  return authData;
}

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const response = await authHttp.post('/api/auth/refresh', {
    token: refreshToken,
  });

  const accessToken = response?.data?.accessToken;
  if (!accessToken) {
    throw new Error('Refresh token request failed');
  }

  setAuthTokens({ accessToken, refreshToken });

  return accessToken;
}

export async function logoutUser() {
  const refreshToken = getRefreshToken();
  let remoteLogoutFailed = false;

  try {
    if (refreshToken) {
      try {
        await authHttp.post('/api/auth/logout', {
          token: refreshToken,
        });
      } catch {
        // Ignore backend logout failures.
        remoteLogoutFailed = true;
      }
    }
  } finally {
    clearAuthTokens();
  }

  return {
    remoteLogoutFailed,
  };
}

export function getSessionSnapshot() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    email: getUserEmail(),
    isAuthenticated: Boolean(getAccessToken()),
  };
}
