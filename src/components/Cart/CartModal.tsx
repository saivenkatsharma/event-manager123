import { Modal, Box, Typography, Button } from '@mui/material';
import { CartItem } from './CartItem';
import { useCart } from '../../Context/CartContext';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

export const CartModal = ({ open, onClose }: CartModalProps) => {
  const { cart } = useCart();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Close
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};