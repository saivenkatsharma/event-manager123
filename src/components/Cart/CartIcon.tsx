import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../Context/CartContext';

export const CartIcon = () => {
  const { cart } = useCart();

  return (
    <IconButton color="inherit">
      <Badge badgeContent={cart.length} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};