import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, isCheckingToken, children }) {
  if (isCheckingToken) {
    return null; 
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
