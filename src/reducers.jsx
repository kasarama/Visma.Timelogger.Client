import { LOGIN, LOGOUT } from './actions';

export const user = (state = { loggedIn: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN: {
      const _user = payload;
      _user.loggedIn = true;
      state = { ..._user };
      return state;
    }
    case LOGOUT: {
      state = { loggedIn: false };
      return state;
    }
    default:
      return state;
  }
};
