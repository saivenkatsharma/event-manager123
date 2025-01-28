import { Card, CardContent, Typography, IconButton, Stack, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Event } from '../types/event';
import { useCart } from '../../Context/CartContext';

interface CartItemProps {
    item: Event;
}

export const CartItem = ({ item }: CartItemProps) => {
    const { removeFromCart } = useCart();

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <div>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.dates.start.localDate} | {item._embedded.venues[0].name}
                        </Typography>
                        {item.priceRanges && (
                            <Chip
                                label={`${item.priceRanges[0].min} - ${item.priceRanges[0].max} ${item.priceRanges[0].currency}`}
                                size="small"
                                color="primary"
                                sx={{ mt: 1 }}
                            />
                        )}
                    </div>
                    <IconButton onClick={() => removeFromCart(item.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    );
};