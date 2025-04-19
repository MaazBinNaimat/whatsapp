import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    DragIndicator as DragIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    // Message Volume Data
    const messageData = [
        { name: 'Mon', messages: 1200 },
        { name: 'Tue', messages: 1900 },
        { name: 'Wed', messages: 1500 },
        { name: 'Thu', messages: 2200 },
        { name: 'Fri', messages: 1800 },
        { name: 'Sat', messages: 1000 },
        { name: 'Sun', messages: 800 },
    ];

    // Response Time Distribution
    const responseTimeData = [
        { name: '< 1 min', value: 65 },
        { name: '1-5 min', value: 25 },
        { name: '5-15 min', value: 7 },
        { name: '> 15 min', value: 3 },
    ];

    const COLORS = [
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.secondary.main,
        theme.palette.secondary.light,
    ];

    // User Growth Data
    const userGrowthData = [
        { name: 'Jan', users: 100 },
        { name: 'Feb', users: 150 },
        { name: 'Mar', users: 200 },
        { name: 'Apr', users: 250 },
        { name: 'May', users: 300 },
        { name: 'Jun', users: 400 },
    ];

    const [kpiCards, setKpiCards] = useState([
        {
            id: '1',
            title: 'Total Messages',
            value: '12,500',
            change: '+15%',
            isPositive: true,
            icon: <TrendingUpIcon color="success" />,
        },
        {
            id: '2',
            title: 'Response Rate',
            value: '92%',
            change: '+5%',
            isPositive: true,
            icon: <TrendingUpIcon color="success" />,
        },
        {
            id: '3',
            title: 'Active Users',
            value: '1,250',
            change: '-2%',
            isPositive: false,
            icon: <TrendingDownIcon color="error" />,
        },
        {
            id: '4',
            title: 'Avg. Response Time',
            value: '2.5 min',
            change: '-10%',
            isPositive: true,
            icon: <TrendingUpIcon color="success" />,
        },
    ]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(kpiCards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setKpiCards(items);
    };

    const chartStyles = {
        container: {
            height: 300,
            width: '100%',
            transition: 'all 0.3s ease',
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: 8,
            padding: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        axis: {
            stroke: theme.palette.text.secondary,
            fontSize: 12,
        },
        grid: {
            stroke: theme.palette.divider,
            strokeDasharray: '3 3',
        },
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navigation isDashboard />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>

                {/* KPI Cards */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="kpiCards" direction="horizontal">
                        {(provided) => (
                            <Grid
                                container
                                spacing={3}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {kpiCards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={3}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                >
                                                    <Card
                                                        sx={{
                                                            height: '100%',
                                                            position: 'relative',
                                                            '&:hover': {
                                                                transform: 'translateY(-4px)',
                                                                boxShadow: theme.shadows[4],
                                                            },
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        <Box
                                                            {...provided.dragHandleProps}
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 8,
                                                                right: 8,
                                                                opacity: 0.5,
                                                                '&:hover': {
                                                                    opacity: 1,
                                                                },
                                                            }}
                                                        >
                                                            <DragIcon />
                                                        </Box>
                                                        <CardContent>
                                                            <Typography
                                                                variant="subtitle2"
                                                                color="text.secondary"
                                                                gutterBottom
                                                            >
                                                                {card.title}
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <Typography variant="h4">
                                                                    {card.value}
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        color: card.isPositive
                                                                            ? theme.palette.success.main
                                                                            : theme.palette.error.main,
                                                                    }}
                                                                >
                                                                    {card.icon}
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{ ml: 0.5 }}
                                                                    >
                                                                        {card.change}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            </Grid>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* Charts Section */}
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {/* Message Volume Chart */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardHeader
                                title="Message Volume"
                                subheader="Last 7 days"
                                action={
                                    <Tooltip title="Click to refresh data">
                                        <IconButton>
                                            <TrendingUpIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                            <CardContent>
                                <ResponsiveContainer {...chartStyles.container}>
                                    <BarChart data={messageData}>
                                        <CartesianGrid {...chartStyles.grid} />
                                        <XAxis dataKey="name" {...chartStyles.axis} />
                                        <YAxis {...chartStyles.axis} />
                                        <RechartsTooltip
                                            contentStyle={chartStyles.tooltip}
                                            formatter={(value) => [`${value} messages`, '']}
                                        />
                                        <Bar
                                            dataKey="messages"
                                            fill={theme.palette.primary.main}
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Response Time Distribution */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader
                                title="Response Time Distribution"
                                subheader="Last 30 days"
                            />
                            <CardContent>
                                <ResponsiveContainer {...chartStyles.container}>
                                    <PieChart>
                                        <Pie
                                            data={responseTimeData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {responseTimeData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={chartStyles.tooltip}
                                            formatter={(value) => [`${value}%`, '']}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* User Growth Chart */}
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title="User Growth"
                                subheader="Last 6 months"
                                action={
                                    <Tooltip title="Click to export data">
                                        <IconButton>
                                            <TrendingUpIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                            <CardContent>
                                <ResponsiveContainer {...chartStyles.container}>
                                    <LineChart data={userGrowthData}>
                                        <CartesianGrid {...chartStyles.grid} />
                                        <XAxis dataKey="name" {...chartStyles.axis} />
                                        <YAxis {...chartStyles.axis} />
                                        <RechartsTooltip
                                            contentStyle={chartStyles.tooltip}
                                            formatter={(value) => [`${value} users`, '']}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="users"
                                            stroke={theme.palette.primary.main}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 