import axios, { AxiosResponse } from 'axios';
import { mockPostLogin, mockPostLogout, mockPostAuthorize } from '../_mock/mockFunctions';
import { urlAuth, urlProjects } from './settings';

// types
import { TLoginCredentials, TAuthorizeCredentials, TAppUser } from '../types/userTypes';
import { TCreateTimeRecordRequest, TProject } from 'src/types/projectTypes';

axios.defaults.withCredentials = true;

// Mocked Auth Requests
export const login = (credentials: TLoginCredentials) => mockPostLogin(urlAuth.urlLogin, credentials);

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
export const dataSources = {
  authorize,
  getListProjectOverview,
  getProjectOverview,
};

async function authorizeUser(user: TAppUser, removeUser: () => void) {
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
}
