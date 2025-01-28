import { useEffect, useState } from 'react';
import { Button, Box, MobileStepper, Paper, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { fetchFeaturedEvents } from '../../api/events';
import { Event } from '../../api/events';

export const HeroSection = () => {
    const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const loadFeaturedEvents = async () => {
            const events = await fetchFeaturedEvents(4);
            setFeaturedEvents(events);
        };
        loadFeaturedEvents();
    }, []);

    const handleNext = () => {
        setActiveStep((prevStep) => (prevStep + 1) % featuredEvents.length);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => (prevStep - 1 + featuredEvents.length) % featuredEvents.length);
    };

    if (featuredEvents.length === 0) return null;

    const currentEvent = featuredEvents[activeStep];

    return (
        <Box sx={{ maxWidth: '100%', flexGrow: 1, position: 'relative' }}>
            <Paper
                square
                elevation={0}
                sx={{
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    overflow: 'hidden'
                }}
            >
                <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 50,
                        left: 50,
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}
                >
                    <Typography variant="h4">{currentEvent.title}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href={`/events/${currentEvent.id}`}
                        sx={{ mt: 2 }}
                    >
                        Learn More
                    </Button>
                </Box>
            </Paper>
            <MobileStepper
                steps={featuredEvents.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext}>
                        Next <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack}>
                        <KeyboardArrowLeft /> Back
                    </Button>
                }
            />
        </Box>
    );
};