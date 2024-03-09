import React from 'react';

import axios, { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { mockPostLogin, mockPostLogout, mockPostAuthorize } from '../_mock/mockFunctions';
import { urlAuth, urlProjects } from './settings';

// @mui
import { Alert } from '@mui/material';

// types
import { TLoginCredentials, TAuthorizeCredentials, TAppUser } from '../types/userTypes';
import { TCreateTimeRecordRequest, TProject } from '../types/projectTypes';

const navigate = useNavigate();

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
export const dataSources: any = {
  authorize: authorize,
  getListProjectOverview: getListProjectOverview,
  getProjectOverview: getProjectOverview,
};

export type TState = {
  success: boolean;
  data?: any;
  error?: JSX.Element;
};
export const useDataSources = async (setState: (state: TState) => void, source: string, parameter?: any) => {
  dataSources[source](parameter)
    .then((res: AxiosResponse<any>) => {
      setState({ success: true, data: res.data });
    })
    .catch((err: AxiosError) => {
      const status = err.response && err.response.status ? err.response.status : 0;
      switch (status) {
        case 401: {
          navigate('/401');
          return;
        }
        case 403: {
          navigate('/403');
          return;
        }
        case 400: {
          setState({ success: false, error: <Alert severity="warning">Bad Request</Alert> });
          return;
        }
        default:
          setState({
            success: false,
            error: <Alert severity="error">SERVER ERROR</Alert>,
          });
      }
    });
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
