export function setInStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromStorage(key) {
  return localStorage.getItem(key);
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export function getUserToken() {
  return getFromStorage('token');
}

export function setUserToken(token) {
  setInStorage('token', token);
}

export function removeUserToken() {
  setInStorage('token');
}
