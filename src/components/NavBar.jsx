import React from "react";
import "../styles/dashboard.css";
import logo from "../imgs/icon.png";
import { MdSpaceDashboard, MdLeaderboard, MdAdminPanelSettings } from "react-icons/md";
import { FaCarAlt, FaCalendar, FaPowerOff } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { CgGoogleTasks } from "react-icons/cg";
import { BsPersonFillGear } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import LoadingSkeleton from "./LoadingSkeleton";
import { useUserContext } from "../contexts/UserContext.js";
import { NavLink } from "react-router-dom";


export default function SideNav() {
  const { profile, loading } = useUserContext();

  const avatarUrl = profile?.avatar_url;

  const { logout } = useUserContext();

  return (
    <div className="dash-nav-container">
      <div className="nav-head">
        <img src={logo} alt="Alo-Sales" id="logo" />
        &nbsp;&nbsp;
        <p>Alo—Sales</p>
      </div>

      <nav className="nav-links">
        <ul>
          {/* {profile?.role !== 'admin' ? (<br />): null} */}
          <NavLink to="/dashboard">
            <MdSpaceDashboard /><li>Overview</li>
          </NavLink>
          <NavLink to="/dashboard/leads" className={({ isActive }) => isActive ? "active-link" : ""}>
            <MdLeaderboard /><li>My Leads</li>
          </NavLink>
          <NavLink to="/dashboard/visits" className={({ isActive }) => isActive ? "active-link" : ""}>
            <FaCarAlt /><li>Today's Visits</li>
          </NavLink>
          <NavLink to="/dashboard/activities" className={({ isActive }) => isActive ? "active-link" : ""}>
            <FaCalendar /><li>My Activities</li>
          </NavLink>
          <NavLink to="/dashboard/tasks" className={({ isActive }) => isActive ? "active-link" : ""}>
            <CgGoogleTasks /><li>Tasks/Plans</li>
          </NavLink>
          <br />
          <hr width="100%" color="#f88" height="0.5px" />
          <br />
          <a href="/dashboard/profile-settings"><BsPersonFillGear /><li>Profile Settings</li></a>
          <NavLink to="/dashboard/app-preferences" className={({ isActive }) => isActive ? "active-link" : ""}>
            <FaGear /><li>App Preferences</li>
          </NavLink>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
            <BiSupport /><li>Support</li>
          </NavLink>
          {profile?.role === 'admin' ? (
            <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""}>
              <MdAdminPanelSettings /><li>Admin Panel</li>
            </NavLink>
          ) : null}
        </ul>
      </nav>
        {profile?.role !== 'admin' ? (<><br /><br /></>): null}

      <div className="nav-footer">
        <div>
          <span>
            {avatarUrl && !loading ? (
              <img
                src={avatarUrl}
                alt={profile?.full_name}
                className="profile-pic"
              />
            ) : (
              <span className="profile-pic">
                <LoadingSkeleton width={50} height={50} shape="circle" />
              </span>
            )}
          </span>
          <h2>
            &nbsp;&nbsp;
            {profile?.full_name && !loading ? (
              profile.full_name
            ) : (
              <LoadingSkeleton width={100} height={20} />
            )}
            <h6>
              &nbsp;&nbsp;
              {profile?.position && !loading ? (
                profile.position
              ) : (
                <LoadingSkeleton width={100} height={20} />
              )}
            </h6>
          </h2>
          <button className="logout-btn" onClick={logout} title="Logout">
            <FaPowerOff />
          </button>
        </div>
        
      </div>
    </div>
  );
}
