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
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';

import AdminDashboard from './pages/AdminPanel';
// Dashboard pages
import Overview from './pages/dashboard/Overview';
import AppPref from './pages/dashboard/AppPref';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import Tasks from './pages/dashboard/Tasks';
import Leads from './pages/dashboard/Leads';
import Visits from './pages/dashboard/Visits';
import Activities from './pages/dashboard/Activities';


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
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute session={session}>
          <Overview session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/app-preferences',
      element: (
        <ProtectedRoute session={session}>
          <AppPref session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/activities',
      element: (
        <ProtectedRoute session={session}>
          <Activities session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/leads',
      element: (
        <ProtectedRoute session={session}>
          <Leads session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/profile-settings',
      element: (
        <ProtectedRoute session={session}>
          <ProfileSettings session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/tasks',
      element: (
        <ProtectedRoute session={session}>
          <Tasks session={session} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/visits',
      element: (
        <ProtectedRoute session={session}>
          <Visits session={session} />
        </ProtectedRoute>
      ),
    },
  ]);

  if (checkingSession) return <LoadingSkeleton />;

  return <RouterProvider router={router} />;
}

export default App;
