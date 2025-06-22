import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import './Login.css';

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
        <div className="flex align-items-center justify-content-center">
            <Card className="login-card">
                <div className="flex flex-column align-items-center mb-4">
                    <img
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        alt="profile-img"
                        className="w-5rem h-5rem border-circle mb-4"
                    />
                    <h2 className="mb-3">Sign In</h2>
                </div>
                <form onSubmit={handleLogin}>
                    {error && <Message severity="error" text={error} className="w-full mb-3" />}
                    <div className="p-field mb-3 w-full">
                        <span className="p-float-label w-full">
                            <InputText
                                id="usernameOrEmail"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                className="w-full"
                                autoFocus
                                required
                            />
                            <label htmlFor="usernameOrEmail">Username or Email</label>
                        </span>
                    </div>
                    <div className="p-field mb-3 w-full">
                        <span className="p-float-label w-full">
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                                inputClassName="w-full"
                                feedback={false}
                                toggleMask
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </span>
                    </div>
                    <Button label={loading ? 'Logging in...' : 'Login'} icon="pi pi-sign-in" className="w-full mb-2" type="submit" disabled={loading} />
                </form>
            </Card>
        </div>
    );
};

export default Login;