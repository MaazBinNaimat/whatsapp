import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    useTheme,
    useMediaQuery,
    Divider,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    AccountCircle as AccountIcon,
    ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = ({ isDashboard = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check authentication status from sessionStorage
        const token = sessionStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        setIsLoading(true);
        // Simulate login process
        setTimeout(() => {
            sessionStorage.setItem('authToken', 'dummy-token');
            setIsAuthenticated(true);
            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    const handleLogout = () => {
        setIsLoading(true);
        // Simulate logout process
        setTimeout(() => {
            sessionStorage.removeItem('authToken');
            setIsAuthenticated(false);
            setIsLoading(false);
            handleMenuClose();
            navigate('/');
        }, 1000);
    };

    const handleDashboardRedirect = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 500);
    };

    const handleWebsiteRedirect = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    const menuItems = [
        { label: 'Home', path: '/', icon: <HomeIcon /> },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Features', path: '/features' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar>
                {/* Logo/Brand */}
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                        }}
                    >
                        WhatsApp Business
                    </Typography>
                </Box>

                {/* Navigation Links */}
                {!isDashboard && (
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.label}
                                color="inherit"
                                onClick={() => navigate(item.path)}
                                sx={{
                                    mx: 1,
                                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}

                <Box sx={{ flexGrow: 1 }} />

                {/* Auth Buttons */}
                {isLoading ? (
                    <Box sx={{ px: 2 }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <AccountIcon />
                        </motion.div>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAuthenticated ? (
                            <>
                                {isDashboard ? (
                                    <Button
                                        variant="outlined"
                                        startIcon={<HomeIcon />}
                                        onClick={handleWebsiteRedirect}
                                        sx={{ mr: 2 }}
                                    >
                                        Back to Website
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        startIcon={<DashboardIcon />}
                                        onClick={handleDashboardRedirect}
                                        sx={{ mr: 2 }}
                                    >
                                        Go to Dashboard
                                    </Button>
                                )}
                                <IconButton
                                    onClick={handleMenuOpen}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: theme.palette.primary.main,
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        <AccountIcon />
                                    </Avatar>
                                </IconButton>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleLogin}
                                sx={{ ml: 2 }}
                            >
                                Login / Sign Up
                            </Button>
                        )}
                    </Box>
                )}

                {/* User Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <AccountIcon sx={{ mr: 2 }} />
                        Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 2 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation; 