/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, roles}) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (!token) {
        return <Navigate to="/" replace />;
    }
   
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/not-authorized" replace />;
    }

  return children;
}

export default ProtectedRoute;