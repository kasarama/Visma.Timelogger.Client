const apiGateway = process.env.REACT_APP_API_GATEWAY;
const projectService = process.env.REACT_APP_PROJECT_SERVICE;

export const urlProjects = {
  urlGetListProjectOverview: `${projectService}/api/Projects/GetListProjectOverview`,
  urlCreateTimeRecord: `${projectService}/api/Projects/CreateTimeRecord`,
  urlGetProjectOverview: `${projectService}/api/Projects/GetProjectOverview/`,
};

const urlAuthorize = `${apiGateway}/authorize`;
const urlLogin = `${apiGateway}/login`;
const urlLogout = `${apiGateway}/logout`;

export const urlAuth = {
  urlAuthorize,
  urlLogin,
  urlLogout,
};
