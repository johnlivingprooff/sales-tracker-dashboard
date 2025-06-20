import React, { useState, useEffect } from 'react';
import { useUserContext } from './contexts/UserContext.js';
import LoadingSkeleton from './components/LoadingSkeleton';
import UnauthorizedPage from './components/UnauthorizedPage.jsx';

export default function AdminRoute({ children }) {
    const { user, profile, loading } = useUserContext();
    const [ userProfile, setUserProfile ] = useState(null);

    useEffect(() => {
        if (user && user.id && profile && Array.isArray(profile)) {
            // If profile is an array, find the profile row matching the user id
            userProfile = profile.find(p => p.userId === user.id || p.id === user.id);
        }
    }, [user, profile]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (userProfile?.role !== 'admin') {
    return <UnauthorizedPage
        message="You do not have permission to access the Admin Dashboard."
        redirectTo="/dashboard"
      />
  }

  return children;
}
