import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../imgs/icon.png';
import '../styles/dashboard.css';

export default function UnauthorizedPage({ message, redirectTo = '/', isAdmin = false }) {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!isAdmin) {
            if (countdown === 0) {
                navigate(redirectTo);
            } else {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [countdown, isAdmin, navigate, redirectTo]);

    return (
        <div
            className="no-permission-message"
            style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <img
                src={logo}
                alt="Alo | Sales-Tracker"
                style={{ filter: 'invert(1)', height: '350px', padding: '20px' }}
            />
            {message || 'You are not authorized to view this page.'}
            <br /><br />
            {!isAdmin && (
                <div style={{ marginBottom: '10px', color: '#888', fontSize: '0.8rem' }}>
                    Redirecting to dashboard in {countdown} sec{countdown !== 1 ? 's' : ''}
                </div>
            )}
            <button
                onClick={() => navigate(redirectTo)}
                className="dashboard-link"
                style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                }}
            >
                Go to Dashboard
            </button>
        </div>
    );
}
