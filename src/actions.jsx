export const LOGIN = 'LOGIN';
export const setUser = (user) => ({
  type: LOGIN,
  payload: user,
});

export const LOGOUT = 'LOGOUT';
export const resetUser = () => ({
  type: LOGOUT,
});
