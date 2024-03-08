import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
// components
import { authorize } from '../utils/functions';

export const useAuthorize = (user) => {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  useEffect(() => {
    authorize(user)
      .then(() => {
        setState({ error: undefined });
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
          default:
            setState({
              error: <Alert severity="error">SERVER ERROR</Alert>,
            });
        }
      });
  }, []);

  return { ...state };
};
