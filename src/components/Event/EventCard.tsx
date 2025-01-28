import { Card, CardContent, CardMedia, Typography, Button, Chip, Stack, CardActions } from '@mui/material';
import { Event } from '../types/event';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ShoppingCart, BookOnline } from '@mui/icons-material';
import { signInWithGoogle } from '../config/firebase';

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!user) {
            await signInWithGoogle();
            return;
        }
        addToCart(event);
    };

    const handleBookNow = async () => {
        if (!user) {
            await signInWithGoogle();
            return;
        }
        setLoading(true);
        try {
            // Implement direct booking logic
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={event.images[0].url}
                alt={event.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {event.name}
                </Typography>

                <Stack spacing={1} mb={2}>
                    {event.classifications?.[0]?.genre?.name && (
                        <Chip
                            label={event.classifications[0].genre.name}
                            size="small"
                            color="primary"
                        />
                    )}
                    <Typography variant="body2" color="text.secondary">
                        {event.dates.start.localDate} | {event.dates.start.localTime}
                    </Typography>
                    <Typography variant="body2">
                        {event._embedded?.venues?.[0]?.name || 'Venue TBA'} - {event._embedded?.venues?.[0]?.city?.name || 'City TBA'}
                    </Typography>
                    {event.priceRanges && (
                        <Typography variant="body2" color="text.primary">
                            Price: {event.priceRanges[0].min} - {event.priceRanges[0].max}
                            {event.priceRanges[0].currency}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={handleAddToCart}
                    disabled={loading}
                    fullWidth
                >
                    Add to Cart
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BookOnline />}
                    onClick={handleBookNow}
                    disabled={loading}
                    fullWidth
                >
                    Book Now
                </Button>
            </CardActions>
        </Card>
    );
};