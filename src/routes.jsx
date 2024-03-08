import { Navigate, useRoutes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page401 from './pages/Page401';
import Page403 from './pages/Page403';
import Page404 from './pages/Page404';
import TestPage from './pages/TestPage';
import FreelancerProjecLisWrapper from './pages/pagewrappers/FreelancerProjecLisWrapper';
import FreelancerProjectDetailsWrapper from './pages/pagewrappers/FreelancerProjectDetailsWrapper';
import { ProtectedRoute } from './components/protected-route';

// ----------------------------------------------------------------------

Router.propTypes = {
  user: PropTypes.object,
};
function Router({ user }) {
  const simpleLayout = {
    element: <SimpleLayout />,
    children: [
      {
        path: 'home',
        element: (
          <ProtectedRoute allowedRoles={['freelancer', 'customer']}>
            <TestPage title={'Home Page'} />
          </ProtectedRoute>
        ),
      },
      { path: 'login', element: <LoginPage /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
      { path: '401', element: <Page401 /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  };

  const roleIndexPage = {
    freelancer: [
      { element: <Navigate to="/freelancer" />, index: true },
      { path: '/freelancer', element: <TestPage title={'Freelancer Start Page'} />, index: true },
      { path: '/', element: <TestPage title={'Freelancer Start Page'} /> },
    ],
    customer: [
      { element: <Navigate to="/customer" />, index: true },
      { path: '/customer', element: <TestPage title={'Customer start page'} />, index: true },
      { path: '/', element: <TestPage title={'Customer start page'} /> },
    ],
    common: [
      { element: <Navigate to="/visma_timelogger" />, index: true },
      {
        path: '/visma_timelogger',
        element: <TestPage title={'User with multiple roles start page'} />,
      },
      { path: '/', element: <TestPage title={'Logged in user with multiple roles start page'} />, index: true },
    ],
  };

  const defineIdexPageByRole = (roles) => {
    if (!roles) {
      return [
        {
          path: '/',
          element: <SimpleLayout />,
          children: [
            { element: <Navigate to="/login" />, index: true },
            { path: 'login', element: <LoginPage /> },
            { path: '*', element: <Navigate to="/login" /> },
          ],
        },
      ];
    }
    let index = [];
    if (roles.length > 1) {
      index = roleIndexPage.common;
    }
    if (roles.length === 1) {
      index = roleIndexPage[roles[0].toLowerCase()];
    }

    return [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          ...index,
          {
            path: 'freelancer_projects',
            element: (
              <ProtectedRoute allowedRoles={['freelancer']}>
                <FreelancerProjecLisWrapper />
              </ProtectedRoute>
            ),
          },
          {
            path: 'freelancer_projects/:projectId',
            element: (
              <ProtectedRoute allowedRoles={['freelancer']}>
                <FreelancerProjectDetailsWrapper />
              </ProtectedRoute>
            ),
          },
          {
            path: 'freelancer_somepage',
            element: (
              <ProtectedRoute allowedRoles={['freelancer']}>
                <TestPage title={"Freelancer's Some Page"} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'customer_projects',
            element: (
              <ProtectedRoute allowedRoles={['customer']}>
                <TestPage title={"Customer's Project Page"} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'customer_somepage',
            element: (
              <ProtectedRoute allowedRoles={['customer']}>
                <TestPage title={"Customer's Some Page"} />
              </ProtectedRoute>
            ),
          },
        ],
      },

      simpleLayout,
    ];
  };

  const r = defineIdexPageByRole(user.roles);
  const routes = useRoutes(r);

  return routes;
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Router);
