const users = {
  freelancer1: { name: 'Magdalena', token: 'freelancer1' },
  freelancer2: { name: 'Alexandra', token: 'freelancer2' },
  customer1: { name: 'Dwayne', token: 'customer1' },
  customer2: { name: 'Adrian', token: 'customer2' },
};
const newExpirationTime = () => Date.now + 1000 * 60 * 20;

export const mockPostLogin = (url, credentials) => {
  return new Promise((resolve, reject) => {
    const randomInteger = Math.floor(Math.random() * 20);
    setTimeout(() => {
      if (randomInteger === 2) {
        const responseData = {
          response: { message: 'Internal Server Error', status: 500, statusText: 'Internal Server Error' },
          headers: {},
          config: {},
        };
        reject(responseData);
      } else if (users[credentials.userName] && credentials.password === credentials.userName) {
        const responseData = {
          data: {
            userName: users[credentials.userName].name,
            roles: [credentials.userName.slice(0, -1)],
            token: users[credentials.userName].token,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        };
        localStorage.setItem('tokenExpirationTime', newExpirationTime);
        localStorage.setItem('token', users[credentials.userName].token);

        resolve(responseData);
      } else {
        const responseData = {
          response: { message: 'Login failed', status: 400, statusText: 'Bad Request' },
          headers: {},
          config: {},
        };
        reject(responseData);
      }
    }, 500);
  });
};

export const mockPostLogout = (url) => {
  return new Promise((resolve, reject) => {
    const randomInteger = Math.floor(Math.random() * 20);
    setTimeout(() => {
      if (randomInteger === 2) {
        const responseData = {
          response: { message: 'Internal Server Error', status: 500, statusText: 'Internal Server Error' },
          headers: {},
          config: {},
        };
        localStorage.setItem('tokenExpirationTime', 0);
        reject(responseData);
      } else {
        const responseData = {
          data: {
            message: 'Logged out',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        };
        localStorage.setItem('tokenExpirationTime', 0);
        localStorage.setItem('token', '');
        resolve(responseData);
      }
    }, 500);
  });
};

export const mockPostAuthorize = (url, credentials) => {
  const tokenExpirationTime = +localStorage.getItem('tokenExpirationTime');
  return new Promise((resolve, reject) => {
    const randomInteger = Math.floor(Math.random() * 100);
    setTimeout(() => {
      if (randomInteger === 2) {
        const responseData = {
          response: { message: 'Internal Server Error', status: 500, statusText: 'Internal Server Error' },
          headers: {},
          config: {},
        };
        localStorage.setItem('tokenExpirationTime', 0);
        reject(responseData);
      } else if (tokenExpirationTime > Date.now()) {
        const responseData = {
          data: {
            message: 'Authorized',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        };
        localStorage.setItem('tokenExpirationTime', newExpirationTime);
        resolve(responseData);
      } else {
        const responseData = {
          response: { message: 'Unauthorized', status: 401, statusText: 'Unauthorized' },
          headers: {},
          config: {},
        };
        localStorage.setItem('tokenExpirationTime', Date.now() + 0);
        reject(responseData);
      }
    }, 500);
  });
};
