const TOKEN_KEY = 'jwt-token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.setItem(TOKEN_KEY, '')
}

export function isLogin() {
  return getToken() ? true : false;
}
