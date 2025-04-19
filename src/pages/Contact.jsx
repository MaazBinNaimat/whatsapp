import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

const Contact = () => {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navigation />
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Have questions? We'd love to hear from you.
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4],
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Get in Touch
                                    </Typography>
                                    <Typography color="text.secondary" paragraph>
                                        Our team is here to help you with any questions about our services.
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        📧 Email: support@whatsappbusiness.com
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        📞 Phone: +1 (555) 123-4567
                                    </Typography>
                                    <Typography variant="body1">
                                        📍 Address: 123 Business St, Suite 100, San Francisco, CA 94105
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                sx={{
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4],
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Send us a Message
                                    </Typography>
                                    <Box component="form" noValidate sx={{ mt: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="First Name"
                                                    autoComplete="given-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Last Name"
                                                    autoComplete="family-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Email"
                                                    autoComplete="email"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Message"
                                                    multiline
                                                    rows={4}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    size="large"
                                                >
                                                    Send Message
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact; 