import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { supabase } from './supabaseClient';

import LoadingSkeleton from './components/LoadingSkeleton';
import AdminRoute from './AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import AdminDashboard from './pages/AdminPanel';

function ProtectedRoute({ children, session }) {
  return session ? children : <Navigate to="/" replace />;
}

function App() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setCheckingSession(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/verify-email', element: <VerifyEmail /> },
    { path: '/reset-password', element: <ResetPassword /> },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute session={session}>
          <Dashboard session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/update-password',
      element: (
        <ProtectedRoute session={session}>
          <UpdatePassword session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute session={session}>
          <AdminRoute>
            <AdminDashboard session={session} />
          </AdminRoute>
        </ProtectedRoute>
      ),
    },
  ]);

  if (checkingSession) return <LoadingSkeleton />;

  return <RouterProvider router={router} />;
}

export default App;
