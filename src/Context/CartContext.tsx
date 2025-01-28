import { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../components/config/firebase';
import { Event } from '../components/types/event';

export interface CartContextType {
    cart: Event[];
    addToCart: (event: Event) => Promise<void>;
    removeFromCart: (eventId: string) => Promise<void>;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Event[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            if (auth.currentUser) {
                const cartRef = doc(collection(db, 'users'), auth.currentUser.uid);
                const cartSnap = await getDoc(cartRef);
                setCart(cartSnap.data()?.cart || []);
            }
        };

        fetchCart();
    }, []);

    const updateFirestoreCart = async (newCart: Event[]) => {
        if (auth.currentUser) {
            const cartRef = doc(collection(db, 'users'), auth.currentUser.uid);
            await setDoc(cartRef, { cart: newCart }, { merge: true });
        }
    };

    const addToCart = async (event: Event) => {
        const newCart = [...cart, event];
        setCart(newCart);
        await updateFirestoreCart(newCart);
    };

    const removeFromCart = async (eventId: string) => {
        const newCart = cart.filter(item => item.id !== eventId);
        setCart(newCart);
        await updateFirestoreCart(newCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);