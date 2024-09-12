import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader'
import { loadUser } from '../../features/userSlice.js';
;

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading,user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const location = useLocation();

  if (loading===true) return <Loader/>;

  if (isAuthenticated===false) {
    // Redirect to the login page, but save the current location
    return <Navigate to="/loginsignup" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
