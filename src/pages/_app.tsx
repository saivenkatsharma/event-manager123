import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../Context/AuthContext';
import { CartProvider } from '../Context/CartContext';
import { theme } from '../components/styles/theme';
import { Layout } from '../components/Layout/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <CartProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}