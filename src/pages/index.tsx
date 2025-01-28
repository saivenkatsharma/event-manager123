import { useState } from 'react';
import { Container, Grid, CircularProgress, Alert } from '@mui/material';
import { CategoryTabs } from '../components/Event/CategoryTabs';
import { EventCard } from '../components/Event/EventCard';
import { useEvents } from '../components/hooks/useEvents';
import { Event } from '../components/types/event';

export default function Home() {
    const [category, setCategory] = useState('music');
    const { events, loading, error } = useEvents(category);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <CategoryTabs category={category} setCategory={setCategory} />

            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}

            {error && (
                <Alert severity="error" sx={{ my: 2 }}>
                    Error loading events: {error}
                </Alert>
            )}

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {events.map((event: Event) => (
                    <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}