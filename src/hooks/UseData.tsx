import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse, AxiosError } from 'axios';

// @mui
import { Alert } from '@mui/material';
// components
import { dataSources, TState } from '../utils/apiFacade';
import { TProject } from '@/types/projectTypes';

export const useData = (source: string, parameter?: string) => {
  const [state, setState] = useState<TState>();
  const navigate = useNavigate();

  useEffect(() => {
    dataSources[source](parameter)
      .then((res: AxiosResponse<TProject | TProject[]>) => {
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
  }, [source]);
  return { ...state };
};
