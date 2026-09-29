import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

export const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <p>Cargando...</p>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== "admin") return <Navigate to="/" />
  return children
};