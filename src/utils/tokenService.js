const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const setRefreshToken = (token) => localStorage.setItem(REFRESH_TOKEN, token);

export const removeTokens = () => localStorage.clear();

export const getAuthorization = () => (
  {
    Authorization: `Bearer ${getAccessToken()}`,
  }
);
