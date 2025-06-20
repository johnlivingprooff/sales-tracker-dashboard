import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../imgs/icon.png';
import '../styles/dashboard.css';

export default function AccessDenied({ redirectTo = '/dashboard' }) {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate(redirectTo, { replace: true });
    }

    return () => clearTimeout(timer);
  }, [countdown, navigate, redirectTo]);

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
      You do not have permission to view this page.<br /><br />
      <span>Redirecting to Dashboard in {countdown} second{countdown !== 1 ? 's' : ''}...</span>
      <br />
      <a href={redirectTo} className="dashboard-link">Go to Dashboard</a>
    </div>
  );
}
