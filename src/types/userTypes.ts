export type TLoginCredentials = {
  userName: string;
  password: string;
};

export type TAuthorizeCredentials = {
  userName: string;
  roles: string[];
};

export type TAppUser = {
  userName: string;
  roles: string[];
  loggedIn: boolean;
};
