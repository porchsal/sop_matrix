/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, roles}) => {
    console.log("ProtectedRoute mounted ✅");
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    console.log("🔐 ProtectedRoute check:", { token, userRole, roles });
    if (!token) {
        return <Navigate to="/home" replace />;
    }
   
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/not-authorized" replace />;
    }

  return children;
}

export default ProtectedRoute;