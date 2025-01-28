import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Box,
    useMediaQuery,
    useTheme,
    Menu,
    MenuItem
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
    Menu as MenuIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { CartIcon } from '../Cart/CartIcon';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'My Bookings', path: '/bookings' },
    ];

    const renderDesktopNav = () => (
        <>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                    <Link key={item.path} href={item.path} passHref>
                        <Button
                            color="inherit"
                            sx={{
                                color: router.pathname === item.path ? 'primary.main' : 'inherit'
                            }}
                        >
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton color="inherit" onClick={() => router.push('/cart')}>
                    <Badge badgeContent={4} color="error">
                        <CartIcon />
                    </Badge>
                </IconButton>
                {user ? (
                    <>
                        <Button
                            color="inherit"
                            onClick={handleMenuOpen}
                            startIcon={<PersonIcon />}
                        >
                            {user.displayName || 'Profile'}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={signOut}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        color="inherit"
                        onClick={() => router.push('/auth')}
                    >
                        Login / Sign Up
                    </Button>
                )}
            </Box>
        </>
    );

    const renderMobileNav = () => (
        <>
            <IconButton
                color="inherit"
                edge="start"
                onClick={handleMenuOpen}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                EventHub
            </Typography>
            <IconButton color="inherit" onClick={() => router.push('/cart')}>
                <Badge badgeContent={4} color="error">
                    <CartIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {navItems.map((item) => (
                    <MenuItem
                        key={item.path}
                        onClick={() => {
                            router.push(item.path);
                            handleMenuClose();
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={() => {
                        router.push('/auth');
                        handleMenuClose();
                    }}
                >
                    {user ? 'Profile' : 'Login / Sign Up'}
                </MenuItem>
                {user && (
                    <MenuItem onClick={signOut}>
                        Logout
                    </MenuItem>
                )}
            </Menu>
        </>
    );

    return (
        <AppBar position="sticky">
            <Toolbar>
                {isMobile ? renderMobileNav() : renderDesktopNav()}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 