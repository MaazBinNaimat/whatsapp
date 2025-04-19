import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    useTheme,
    useMediaQuery,
    Divider,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Dashboard as DashboardIcon,
    Chat as ChatIcon,
    Campaign as CampaignIcon,
    Code as CodeIcon,
    Person as PersonIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Chatbot', icon: <ChatIcon />, path: '/chatbot' },
    { text: 'Campaigns', icon: <CampaignIcon />, path: '/campaigns' },
    { text: 'Developer API', icon: <CodeIcon />, path: '/developer-api' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Layout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();

    const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);
    const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleDrawerCollapse = () => {
        setIsDrawerCollapsed(!isDrawerCollapsed);
    };

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    const drawer = (
        <Box
            sx={{
                width: isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth,
                    boxSizing: 'border-box',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                },
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {!isDrawerCollapsed && 'WhatsApp Business'}
                </Typography>
                <IconButton onClick={handleDrawerCollapse}>
                    {isDrawerCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{
                            minHeight: 48,
                            justifyContent: isDrawerCollapsed ? 'center' : 'initial',
                            px: 2.5,
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.primary.light,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light,
                                },
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: isDrawerCollapsed ? 0 : 3,
                                justifyContent: 'center',
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        {!isDrawerCollapsed && <ListItemText primary={item.text} />}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${isDrawerOpen ? (isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth) : 0}px)`,
                    ml: isDrawerOpen ? (isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth) : 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Tooltip title="Notifications">
                            <IconButton onClick={handleNotificationClick}>
                                <Badge badgeContent={notifications.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleNotificationClose}
                            PaperProps={{
                                sx: {
                                    mt: 1.5,
                                    minWidth: 300,
                                    maxHeight: 400,
                                },
                            }}
                        >
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <MenuItem key={index} onClick={handleNotificationClose}>
                                        <ListItemIcon>
                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                {notification.icon}
                                            </Avatar>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={notification.title}
                                            secondary={notification.message}
                                        />
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    <ListItemText primary="No new notifications" />
                                </MenuItem>
                            )}
                        </Menu>
                        <Tooltip title="Account">
                            <IconButton>
                                <Avatar sx={{ width: 32, height: 32 }}>
                                    <PersonIcon />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            {!isMobile && (
                <Drawer
                    variant="permanent"
                    open={isDrawerOpen}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            )}

            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={isDrawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: `calc(100% - ${isDrawerOpen ? (isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth) : 0}px)`,
                    ml: isDrawerOpen ? (isDrawerCollapsed ? collapsedDrawerWidth : drawerWidth) : 0,
                    mt: 8,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout; 