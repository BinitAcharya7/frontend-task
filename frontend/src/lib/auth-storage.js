const ACCESS_TOKEN_KEY = 'frontend_task_access_token';
const REFRESH_TOKEN_KEY = 'frontend_task_refresh_token';
const USER_EMAIL_KEY = 'frontend_task_user_email';

function getStorage() {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
}

export function getAccessToken() {
  const storage = getStorage();
  if (!storage) return null;
  return storage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  const storage = getStorage();
  if (!storage) return null;
  return storage.getItem(REFRESH_TOKEN_KEY);
}

export function getUserEmail() {
  const storage = getStorage();
  if (!storage) return null;
  return storage.getItem(USER_EMAIL_KEY);
}

export function setAuthTokens({ accessToken, refreshToken }) {
  const storage = getStorage();
  if (!storage) return;

  if (accessToken) {
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuthTokens() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
  storage.removeItem(USER_EMAIL_KEY);
}

export function setUserEmail(email) {
  const storage = getStorage();
  if (!storage) return;
  if (!email) return;
  storage.setItem(USER_EMAIL_KEY, email);
}

export function getAuthTokens() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    email: getUserEmail(),
  };
}
