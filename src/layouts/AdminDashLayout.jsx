// import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/dashboard.css';
import SideNav from '../components/NavBarAdmin.jsx';
import { useUserContext } from '../contexts/UserContext.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import UserHeader from '../components/UserHeader.jsx';

export default function DashboardLayout({ title = 'Dashboard', children }) {
    const { loading } = useUserContext();
    
    if (loading) return <LoadingSkeleton />;

    return (
        <>
            <Helmet>
                <title>{title} | Alo—Sales</title>
            </Helmet>
            <div className="dashboard-container">
                <SideNav />
                <div className="dashboard-content">
                    <UserHeader title={title} />
                    {children}
                    <p className="copyright">© 2024 Alo—Sales. All rights reserved. Version 1.0.0</p>
                </div>
            </div>
        </>
    );
}