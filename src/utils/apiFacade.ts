import axios, { AxiosResponse } from 'axios';

import { mockPostLogin, mockPostLogout, mockPostAuthorize } from '../_mock/mockFunctions';
import { urlAuth, urlProjects } from './settings';

// types
import { TLoginCredentials, TAuthorizeCredentials, TAppUser } from '../types/userTypes';
import { TCreateTimeRecordRequest, TProject } from '../types/projectTypes';

axios.defaults.withCredentials = true;

// Mocked Auth Requests

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (credentials: TLoginCredentials): Promise<any> => mockPostLogin(urlAuth.urlLogin, credentials);

export const logout = () => mockPostLogout(urlAuth.urlLogout);

export const authorize = (credentials: TAuthorizeCredentials) => mockPostAuthorize(urlAuth.urlAuthorize, credentials);

// Auth Requests
// export const login = (credentials:TLoginCredentials) => axios.post(urlAuth.urlLogin, credentials);
// export const logout = () => axios.post(urlAuth.urlLogout);
// export const authorize = (credentials:TAuthorizeCredentials) => axios.post(urlAuth.urlAuthorize, credentials);

// Project Requests
const getListProjectOverview = (): Promise<AxiosResponse<TProject[]>> =>
  axios.get(urlProjects.urlGetListProjectOverview, {
    headers: { User: localStorage.getItem('token') },
  });
const getProjectOverview = (projectId: string): Promise<AxiosResponse<TProject>> =>
  axios.get(`${urlProjects.urlGetProjectOverview}${projectId}`, {
    headers: { User: localStorage.getItem('token') },
  });

export const postCreateTimeRecord = (timeRecord: TCreateTimeRecordRequest): Promise<AxiosResponse<TProject[]>> =>
  axios.post(urlProjects.urlCreateTimeRecord, timeRecord, {
    headers: { User: localStorage.getItem('token') },
  });

// useDataSources
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataSources: any = {
  authorize: authorize,
  getListProjectOverview: getListProjectOverview,
  getProjectOverview: getProjectOverview,
};

export type TState = {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: JSX.Element;
};

export const authorizeUser = async (user: TAppUser, removeUser: () => void) => {
  if (user.loggedIn) {
    authorize({ userName: user.userName, roles: user.roles })
      .then(() => {})
      .catch(() => {
        logout()
          .then(() => {
            removeUser();
          })
          .catch(() => {
            removeUser();
          });
      });
  } else {
    logout()
      .then(() => {
        removeUser();
      })
      .catch(() => {
        removeUser();
      });
  }
};
