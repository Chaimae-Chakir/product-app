// Login.jsx
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import './Login.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
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
            await login(username, password);
            navigate('/products');
        } catch (err) {
            setError('Login failed. Please check your credentials and try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-outer-container">
            <Card className="login-card">
                <div className="login-container">
                    <h2 className="login-title">Sign In</h2>

                    {error && (
                        <Message
                            severity="error"
                            text={error}
                            className="login-error-message"
                        />
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="p-float-label login-field">
                            <InputText
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="login-input w-full"
                                autoFocus
                                required
                            />
                            <label htmlFor="username">Username</label>
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
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <Button
                            label={loading ? '' : 'Sign In'}
                            className="login-button"
                            type="submit"
                            loading={loading}
                        />
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default Login;