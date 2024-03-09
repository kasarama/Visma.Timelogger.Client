import { TAppUser } from './types/userTypes';

export const LOGIN = 'LOGIN';
export const setUser = (user: TAppUser) => ({
  type: LOGIN,
  payload: user,
});

export const LOGOUT = 'LOGOUT';
export const resetUser = () => ({
  type: LOGOUT,
});
