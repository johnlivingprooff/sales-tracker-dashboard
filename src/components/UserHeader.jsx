import React from 'react';
import '../styles/dashboard.css';
import { useUserContext } from '../contexts/UserContext.js';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { RiNotification3Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

export default function UserHeader( { title = 'Dashboard' } ) {
    const { user, profile, loading } = useUserContext();
    
    const avatarUrl = profile?.avatar_url;
    
    return (
        <div className="user-header">
            <div className='welcome-info'>
                {/* <h6>Hi! {profile?.full_name || <LoadingSkeleton width={40} height={20}/>}</h6> */}
                <h3>
                    <span style={{background: 'linear-gradient(90deg, #f86, #f6a)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Alo /</span> {title}
                </h3>
            </div>
            <div className="search">
                <input type="text" placeholder="Search..." />
                <IoIosSearch className='search-icon' />
            </div>
            <div className='user-sett'>
                <RiNotification3Fill id="notif-bell"/> 
                <p>Hi {profile?.full_name || <LoadingSkeleton width={40} height={20}/>}</p>
                {avatarUrl && !loading ? (
                    <img
                        src={avatarUrl}
                        alt={profile?.full_name}
                        className="nav-profile-pic"
                    />
                ) : (
                    <span className="nav-profile-pic-skeleton">
                        <LoadingSkeleton width={40} height={40} shape="circle" />
                    </span>
                )}
                
            </div>
        </div>
    );
}