import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import { hasAllowedRoles } from '../../utils/functions';

const ProtectedRoute = ({ allowedRoles, user, children }) => {
  if (!user.loggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (!hasAllowedRoles(allowedRoles, user.roles)) {
    return <Navigate to="/403" replace />;
  }
  return children;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
