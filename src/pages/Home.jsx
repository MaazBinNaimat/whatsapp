import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    WhatsApp as WhatsAppIcon,
    CheckCircle as CheckCircleIcon,
    ArrowForward as ArrowForwardIcon,
    Star as StarIcon,
    Business as BusinessIcon,
    Support as SupportIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const features = [
        {
            icon: <BusinessIcon sx={{ fontSize: 40 }} />,
            title: 'Business Automation',
            description: 'Automate customer interactions and streamline your workflow with our powerful chatbot.',
        },
        {
            icon: <SupportIcon sx={{ fontSize: 40 }} />,
            title: '24/7 Customer Support',
            description: 'Provide instant support to your customers anytime, anywhere with automated responses.',
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Enterprise Security',
            description: 'Bank-grade security with end-to-end encryption and data protection.',
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            title: 'Lightning Fast',
            description: 'Quick setup and instant deployment with our intuitive interface.',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'CEO, TechStart',
            avatar: 'SJ',
            content: 'This platform has transformed our customer service. Response times are down 80% and customer satisfaction is through the roof!',
        },
        {
            name: 'Michael Chen',
            role: 'Operations Manager, RetailPro',
            avatar: 'MC',
            content: 'The automation features have saved us countless hours. Our team can now focus on more important tasks.',
        },
        {
            name: 'Emma Davis',
            role: 'Marketing Director, GrowthCo',
            avatar: 'ED',
            content: 'The campaign management tools are incredible. We\'ve seen a 3x increase in engagement since switching.',
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navigation />
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    py: 8,
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom>
                        WhatsApp Business API
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
                        Connect with your customers through WhatsApp
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: 'white',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Learn More
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Features
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
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
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        p: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: theme.palette.primary.light,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Testimonials Section */}
            <Box sx={{ bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" gutterBottom>
                        Trusted by Businesses Worldwide
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                        Join thousands of satisfied customers who have transformed their business
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                                                    {testimonial.avatar}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle1">
                                                        {testimonial.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {testimonial.role}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="body1" sx={{ mb: 2 }}>
                                                {testimonial.content}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        sx={{ color: theme.palette.warning.main }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Container maxWidth="md" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            color: 'white',
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            Ready to Transform Your Business?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Start your free trial today and see the difference in 14 days.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: 'white',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                },
                            }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Get Started Now
                        </Button>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Home; 