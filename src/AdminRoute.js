import React, { useState, useEffect } from 'react';
import { useUserContext } from './contexts/UserContext.js';
import LoadingSkeleton from './components/LoadingSkeleton';
import UnauthorizedPage from './components/UnauthorizedPage.jsx';

export default function AdminRoute({ children }) {
    const { user, profile, loading } = useUserContext();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (profile?.role !== 'admin') {
    return <UnauthorizedPage
        message="You do not have permission to access the Admin Dashboard."
        redirectTo="/dashboard"
      />
  } else if (!user) {
    return <UnauthorizedPage
        message="You must be logged in to access the Admin Dashboard."
        redirectTo="/"
      />
  }

  return children;
}
