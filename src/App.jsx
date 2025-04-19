import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Contact from './pages/Contact';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('authToken');
    return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all route - redirect to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
