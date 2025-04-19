import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

const Features = () => {
    const theme = useTheme();

    const features = [
        {
            title: 'Automated Messaging',
            description: 'Set up automated responses and workflows to handle customer inquiries 24/7.',
            icon: '🤖',
        },
        {
            title: 'Analytics Dashboard',
            description: 'Track message volume, response times, and customer engagement metrics.',
            icon: '📊',
        },
        {
            title: 'Team Collaboration',
            description: 'Assign conversations to team members and manage customer interactions efficiently.',
            icon: '👥',
        },
        {
            title: 'API Integration',
            description: 'Seamlessly integrate with your existing systems and workflows.',
            icon: '🔌',
        },
        {
            title: 'Custom Templates',
            description: 'Create and manage message templates for quick responses.',
            icon: '📝',
        },
        {
            title: 'Security & Compliance',
            description: 'Enterprise-grade security with end-to-end encryption and data protection.',
            icon: '🔒',
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navigation />
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Powerful Features
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Everything you need to automate and scale your business communication
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: theme.shadows[4],
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                        <Typography variant="h1" sx={{ mb: 2 }}>
                                            {feature.icon}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Features; 