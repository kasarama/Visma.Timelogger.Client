import axios from 'axios';
import { filter } from 'lodash';
import { format, parseISO } from 'date-fns';
import { mockPostLogin, mockPostLogout, mockPostAuthorize } from '../_mock/mockFunctions';
import { urlAuth,  urlProjects } from './settings';

export const errorPrompt = (err) => {
  const errorsObjects = err.errors || {};
  let errorList = [];
  Object.values(errorsObjects).forEach((v) => {
    errorList = errorList.concat(v);
  });

  return (
    <div>
      <p>{err.message}</p>
      <dl key="errorList">
        {errorList.map((e, i) => (
          <dt key={`e_${i}`}>{e}</dt>
        ))}
      </dl>
    </div>
  );
};

axios.defaults.withCredentials = true;
// Projects

// Mocked Auth Requests
export const login = (credentials) => mockPostLogin(urlAuth.urlLogin, credentials);

export const logout = () => mockPostLogout(urlAuth.urlLogout);

export const authorize = (credentials) => mockPostAuthorize(urlAuth.urlAuthorize, credentials);

// Mocked Auth Requests
// export const login = (credentials) => axios.post(urlAuth.urlLogin, credentials);
// export const logout = () => axios.post(urlAuth.urlLogout);
// export const authorize = (credentials) => axios.post(urlAuth.urlAuthorize, credentials);

// Project Requests
const getListProjectOverview = () =>
  axios.get(urlProjects.urlGetListProjectOverview, {
    headers: { User: localStorage.getItem('token') },
  });
const getProjectOverview = (projectId) =>
  axios.get(`${urlProjects.urlGetProjectOverview}${projectId}`, {
    headers: { User: localStorage.getItem('token') },
  });

export const postCreateTimeRecord = (timeRecord) =>
  axios.post(urlProjects.urlCreateTimeRecord, timeRecord, {
    headers: { User: localStorage.getItem('token') },
  });


// useDataSources
export const dataSources = {
  authorize,
  getListProjectOverview,
  getProjectOverview,
 
};

// functions

export const hasAllowedRoles = (allowedRoles, userRoles) => {
  let isAllowed = false;
  allowedRoles.forEach((r) => {
    if (userRoles.includes(r)) {
      isAllowed = true;
    }
  });
  return isAllowed;
};

export const formatDateToLocale = (date) => format(parseISO(date), 'dd-MM-yyyy');

// ********************************************************************
export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export const applySortFilter = (array, comparator, query) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
};

export const secondsToTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${hours}:${minutes}:${seconds}`;
};

export const rowBackground = (status) => {
  switch (status) {
    case 'InProduction': {
      return '#fffef1';
    }
    case 'Finished': {
      return '#EEFFEE';
    }
    case 'OnHold': {
      return '#ffe3e3';
    }
    default:
      return 'white';
  }
};

// ***************************************************************
