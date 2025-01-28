import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { AppBar, Toolbar, Badge, IconButton, Avatar, Button, Tooltip } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { signInWithGoogle } from '../../config/firebase';

export const Header = () => {
    const { user } = useAuth();
    const { cart } = useCart();

    return (
        <AppBar position="sticky">
            <Toolbar>
                {/* ... existing header content ... */}

                {user ? (
                    <>
                        <Tooltip title="Cart">
                            <IconButton color="inherit" href="/cart">
                                <Badge badgeContent={cart.length} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={user.displayName || 'Profile'}>
                            <IconButton>
                                <Avatar
                                    src={user.photoURL || undefined}
                                    alt={user.displayName || 'User'}
                                >
                                    {!user.photoURL && <Person />}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <Button
                        color="inherit"
                        startIcon={<Person />}
                        onClick={signInWithGoogle}
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};