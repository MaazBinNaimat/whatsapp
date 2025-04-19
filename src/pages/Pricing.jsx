import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Check as CheckIcon,
    ExpandMore as ExpandMoreIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Pricing = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [billingCycle, setBillingCycle] = useState('monthly');

    const handleBillingCycleChange = (event, newValue) => {
        if (newValue !== null) {
            setBillingCycle(newValue);
        }
    };

    const plans = [
        {
            name: 'Basic',
            price: {
                monthly: '$29',
                yearly: '$290',
            },
            description: 'Perfect for small businesses getting started',
            features: [
                'Up to 1,000 messages/month',
                'Basic chatbot templates',
                'Email support',
                'Basic analytics',
                'Single user',
            ],
            cta: 'Start Free Trial',
            popular: false,
        },
        {
            name: 'Pro',
            price: {
                monthly: '$99',
                yearly: '$990',
            },
            description: 'For growing businesses with advanced needs',
            features: [
                'Up to 10,000 messages/month',
                'Custom chatbot flows',
                'Priority support',
                'Advanced analytics',
                'Up to 5 users',
                'API access',
                'Webhook integration',
            ],
            cta: 'Start Free Trial',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: {
                monthly: 'Custom',
                yearly: 'Custom',
            },
            description: 'For large organizations with custom requirements',
            features: [
                'Unlimited messages',
                'Custom development',
                '24/7 support',
                'Custom analytics',
                'Unlimited users',
                'Dedicated account manager',
                'SLA guarantee',
                'Custom integrations',
            ],
            cta: 'Contact Sales',
            popular: false,
        },
    ];

    const faqs = [
        {
            question: 'What happens after my free trial?',
            answer: 'After your 14-day free trial, you can choose any of our paid plans. Your data and settings will be preserved when you upgrade.',
        },
        {
            question: 'Can I change plans later?',
            answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
        },
        {
            question: 'Do you offer refunds?',
            answer: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our service.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
        },
        {
            question: 'Is there a contract?',
            answer: 'No, you can cancel your subscription at any time. No long-term contracts required.',
        },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    py: 8,
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom>
                        Simple, Transparent Pricing
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
                        Choose the perfect plan for your business needs
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <ToggleButtonGroup
                            value={billingCycle}
                            exclusive
                            onChange={handleBillingCycleChange}
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 2,
                                '& .MuiToggleButton-root': {
                                    color: theme.palette.primary.main,
                                    '&.Mui-selected': {
                                        bgcolor: theme.palette.primary.main,
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ToggleButton value="monthly">Monthly</ToggleButton>
                            <ToggleButton value="yearly">Yearly (Save 20%)</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Container>
            </Box>

            {/* Pricing Cards */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {plans.map((plan, index) => (
                        <Grid item xs={12} md={4} key={index}>
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
                                        position: 'relative',
                                        ...(plan.popular && {
                                            border: `2px solid ${theme.palette.primary.main}`,
                                            transform: 'scale(1.05)',
                                            [theme.breakpoints.down('md')]: {
                                                transform: 'scale(1)',
                                            },
                                        }),
                                    }}
                                >
                                    {plan.popular && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -12,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                bgcolor: theme.palette.primary.main,
                                                color: 'white',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Most Popular
                                        </Box>
                                    )}
                                    <CardHeader
                                        title={plan.name}
                                        subheader={plan.description}
                                        titleTypographyProps={{ align: 'center', variant: 'h4' }}
                                        subheaderTypographyProps={{ align: 'center' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                                            <Typography variant="h3" component="h2" gutterBottom>
                                                {plan.price[billingCycle]}
                                            </Typography>
                                            {billingCycle === 'monthly' && (
                                                <Typography color="text.secondary">
                                                    per month
                                                </Typography>
                                            )}
                                        </Box>
                                        <List>
                                            {plan.features.map((feature, featureIndex) => (
                                                <ListItem key={featureIndex}>
                                                    <ListItemIcon>
                                                        <CheckIcon color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={feature} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                    <Box sx={{ p: 2 }}>
                                        <Button
                                            fullWidth
                                            variant={plan.popular ? 'contained' : 'outlined'}
                                            size="large"
                                            sx={{
                                                mt: 2,
                                                ...(plan.popular && {
                                                    bgcolor: theme.palette.primary.main,
                                                    color: 'white',
                                                    '&:hover': {
                                                        bgcolor: theme.palette.primary.dark,
                                                    },
                                                }),
                                            }}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* FAQ Section */}
            <Box sx={{ bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" gutterBottom>
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                        Everything you need to know about our pricing
                    </Typography>
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                '&:before': {
                                    display: 'none',
                                },
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="text.secondary">{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    py: 8,
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" gutterBottom>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
                        Join thousands of businesses using our platform
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
                            Start Free Trial
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
                            Contact Sales
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Pricing; 