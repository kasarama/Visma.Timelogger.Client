import { useState, useEffect } from 'react';

// components
import { useDataSources, TState } from '../utils/api';

export const useData = (source: string, parameter?: string) => {
  const [state, setState] = useState<TState>();
  useEffect(() => {
    useDataSources(setState, source, parameter);
  }, [source]);
  return { ...state };
};

/*
 useEffect(() => {
    dataSources[source](parameter)
      .then((res:TApiResponse<any>) => {
        console.log(res);
        setState({ data: res.data, error: undefined });
      })
      .catch((err) => {
        console.log(err);
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

  */
