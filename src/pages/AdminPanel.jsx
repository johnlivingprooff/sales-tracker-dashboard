import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/dashboard.css';
import logo from '../imgs/icon.png';
import Header from '../components/NavBarAdmin.jsx';
import { useUserContext } from '../contexts/UserContext.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

export default function AdminDashboard() {
    const { user, profile, loading } = useUserContext();
    const [ userProfile, setUserProfile ] = useState(null);

    useEffect(() => {
        if (user && user.id && profile && Array.isArray(profile)) {
            // If profile is an array, find the profile row matching the user id
            const matchedProfile = profile.find(p => p.userId === user.id || p.id === user.id);
            if (matchedProfile) {
                // Optionally, set matchedProfile to state
                setUserProfile(matchedProfile);
            }
        }
    }, [user, profile]);

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Alo—Sales</title>
            </Helmet>
            <div className="dashboard-container">
                <Header />
                <div className="dashboard-content">
                    ...
                </div>
            </div>
        </>
    );
}