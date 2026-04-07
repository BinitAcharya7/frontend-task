import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_EMAIL_KEY,
  isBrowser,
} from '@/lib/config';

export function getAccessToken() {
  if (!isBrowser) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (!isBrowser) return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getUserEmail() {
  if (!isBrowser) return null;
  return window.localStorage.getItem(USER_EMAIL_KEY);
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
  window.localStorage.removeItem(USER_EMAIL_KEY);
}

export function setUserEmail(email) {
  if (!isBrowser) return;
  if (!email) return;
  window.localStorage.setItem(USER_EMAIL_KEY, email);
}

export function getAuthTokens() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    email: getUserEmail(),
  };
}
