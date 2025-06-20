// import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/dashboard.css';
import Header from '../components/NavBar.jsx';
import { useUserContext } from '../contexts/UserContext.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

export default function Dashboard() {
    const { user, loading } = useUserContext();
    


    return (
        <>
            <Helmet>
                <title>Dashboard | Alo—Sales</title>
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