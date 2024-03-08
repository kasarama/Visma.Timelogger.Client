import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
// components
import { dataSources } from '../utils/functions';

export const useData = (source, parameter) => {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  useEffect(() => {
    dataSources[source](parameter)
      .then((res) => {
        setState({ data: res.data, error: undefined });
      })
      .catch((err) => {
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
            setState({
              data: undefined,
              error: <Alert severity="warning">Bad Request</Alert>,
            });
            return;
          }
          default:
            setState({
              data: undefined,
              error: <Alert severity="error">SERVER ERROR</Alert>,
            });
        }
      });
  }, [source]);
  return { ...state };
};
