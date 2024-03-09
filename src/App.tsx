import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { connect } from 'react-redux';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// types
import { TAppUser } from './types/userTypes';

// components
import ScrollToTop from './components/scroll-to-top';
import { resetUser } from './actions';
import { authorizeUser } from './utils/api';

// ----------------------------------------------------------------------
type TAppProps = {
  user: TAppUser;
  removeUser: () => void;
};
const App = ({ user, removeUser }: TAppProps) => {
  const [ignore, setIgnore] = useState(true);

  useEffect(() => {
    if (!ignore) {
      authorizeUser(user, removeUser).finally(() => {
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
};
const mapDispatchToProps = (dispatch: (action: { type: string }) => void) => ({
  removeUser: () => dispatch(resetUser()),
});

const mapStateToProps = (state: { loggedIn: boolean; user: TAppUser }) => ({
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
