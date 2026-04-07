import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, isBrowser } from '@/lib/config';

export function getAccessToken() {
  if (!isBrowser) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (!isBrowser) return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAuthTokens({ accessToken, refreshToken }) {
  if (!isBrowser) return;

  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuthTokens() {
  if (!isBrowser) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAuthTokens() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  };
}
