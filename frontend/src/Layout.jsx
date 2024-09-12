import React from 'react';
import Header from './Components/layout/Header/Header';
import Footer from './Components/layout/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './features/userSlice';
import { useEffect } from 'react';

// LoadUserEffect component
const LoadUserEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return null; // This component doesn't render anything
};

function Layout() {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    // Disable specific key combinations (F12, Ctrl+Shift+I, Ctrl+Shift+J, etc.)
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
    
      <LoadUserEffect />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
