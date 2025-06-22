import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <nav className="navbar navbar-expand header-bar">
            <Link to="/" className="navbar-brand">
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="header-logo" />
            </Link>
            <div className="navbar-nav mr-auto">
                {isAuthenticated && (
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Products
                        </Link>
                    </li>
                )}
            </div>

            <div className="navbar-nav ml-auto">
                {isAuthenticated ? (
                    <>
                        <li className="nav-item">
                            <span className="nav-link">Welcome, {user.username}</span>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logout}>
                                Logout
                            </a>
                        </li>
                    </>
                ) : (
                    !isLoginPage && (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                    )
                )}
            </div>
        </nav>
    );
};

export default Header; 