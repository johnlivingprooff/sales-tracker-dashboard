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

export default function SideNav() {
  const { profile, loading } = useUserContext();

  const avatarUrl = profile?.avatar_url;

  const { logout } = useUserContext();

  return (
    <div className="dash-nav-container">
      <div className="nav-head">
        <img src={logo} alt="Alo-Sales" id="logo" />
        &nbsp;&nbsp;
        <p style={{fontSize: '1.2rem'}}>Admin Panel | <span style={{background: 'linear-gradient(90deg, #f86, #f6a)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Alo</span></p>
      </div>

      <nav className="nav-links">
        <ul>
          <a href="#"><MdSpaceDashboard /><li>Overview</li></a>
          <a href="#"><MdLeaderboard /><li>Sales Leads</li></a>
          <a href="#"><FaCarAlt /><li>Today's Visits</li></a>
          <a href="#"><FaCalendar /><li>Calender</li></a>
          <a href="#"><CgGoogleTasks /><li>Tasks/Plans</li></a>
          <br />
          <hr width="100%" color="#f88" height="0.5px" />
          <br />
          <a href="#"><BsPersonFillGear /><li>Profile Settings</li></a>
          <a href="#"><FaGear /><li>App Preferences</li></a>
          <a href="#"><BiSupport /><li>Support</li></a>
          {profile?.role === 'admin' ? (
            <a href="/dashboard"><MdSpaceDashboard /><li>&larr; Dashboard</li></a>
          ) : null}
        </ul>
      </nav>

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
        {/* <br />
        <br /> */}
      </div>
    </div>
  );
}
