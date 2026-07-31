const storage = {
  getToken: (tokenType) => localStorage.getItem(tokenType),
  setToken: (tokenType, token) => localStorage.setItem(tokenType, token),
  removeToken: (tokenType) => localStorage.removeItem(tokenType),
};

export default storage;
