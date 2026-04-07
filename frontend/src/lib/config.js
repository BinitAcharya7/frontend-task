export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'frontend_task_access_token';

export const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'frontend_task_refresh_token';

export const USER_EMAIL_KEY =
  process.env.NEXT_PUBLIC_USER_EMAIL_KEY || 'frontend_task_user_email';

export const isBrowser = typeof window !== 'undefined';
