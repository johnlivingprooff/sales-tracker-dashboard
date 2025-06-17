import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { supabase } from './supabaseClient';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';

function ProtectedRoute({ children, session }) {
  return session ? children : <Navigate to="/" replace />;
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get session on mount
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) setSession(data.session);
    };

    getSession();

    // Listen to auth state changes
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
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute session={session}>
          <Dashboard session={session} />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
