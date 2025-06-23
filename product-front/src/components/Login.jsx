// Login.jsx
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import './Login.css';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(usernameOrEmail, password);
            navigate('/');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="login-card">
            <div className="login-container">
                <h2 className="login-title">Welcome Back</h2>

                {error && (
                    <Message
                        severity="error"
                        text={error}
                        className="login-error-message"
                    />
                )}

                <div className="login-form">
                    <div className="p-float-label login-field">
                        <InputText
                            id="usernameOrEmail"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            className="login-input w-full"
                            autoFocus
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                        />
                        <label htmlFor="usernameOrEmail">Username or Email</label>
                    </div>

                    <div className="p-float-label login-field">
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-password w-full"
                            inputClassName="login-password-input"
                            feedback={false}
                            toggleMask
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <Button
                        label={loading ? 'Signing In...' : 'Sign In'}
                        icon={loading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'}
                        className="login-button"
                        onClick={handleLogin}
                        disabled={loading}
                        loading={loading}
                    />
                </div>
            </div>
        </Card>
    );
};

export default Login;