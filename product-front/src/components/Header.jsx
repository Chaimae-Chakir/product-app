import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const items = [];

    const logo = process.env.PUBLIC_URL + '/logo.png';

    const start = (
        <img alt="logo" src={logo} height="40" className="header-logo mr-2" onClick={() => navigate('/')} />
    );

    let end = null;
    if (isAuthenticated) {
        end = (
            <div className="flex align-items-center gap-2">
                <span className="header-greeting">Welcome, {user.username}</span>
                <span className="header-menu-link" onClick={logout}>
                    <i className="pi pi-sign-out header-menu-icon"></i> Logout
                </span>
            </div>
        );
    }

    return (
        <Menubar model={items} start={start} end={end} />
    );
};

export default Header; 