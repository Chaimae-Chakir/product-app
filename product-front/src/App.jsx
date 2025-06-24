import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const location = useLocation();
    const hideHeader = location.pathname === '/login';
    return (
        <AuthProvider>
            <div className="App">
                {!hideHeader && <Header />}
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/products" element={<ProductList />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App; 