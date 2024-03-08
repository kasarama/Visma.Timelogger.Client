import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/scroll-to-top';
import { authorize, logout } from './utils/functions';
import { resetUser } from './actions';
// ----------------------------------------------------------------------
App.propTypes = {
  user: PropTypes.object,
  removeUser: PropTypes.func,
};
function App({ user, removeUser }) {
  const [ignore, setIgnore] = useState(true);
  async function authorizeUser() {
    if (user.loggedIn) {
      authorize({ userName: user.userName, roles: user.roles })
        .then((res) => {})
        .catch((err) => {
          logout()
            .then((res) => {
              removeUser();
            })
            .catch((err) => {
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
  useEffect(() => {
    if (!ignore) {
      authorizeUser().finally(() => {
        setIgnore(true);
      });
    }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(resetUser()),
});

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
