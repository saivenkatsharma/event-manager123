import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../components/config/firebase';
import { Event } from '../components/types/event';

export const getCartFromFirestore = async (userId: string): Promise<Event[]> => {
    const cartRef = doc(collection(db, 'users'), userId);
    const cartSnap = await getDoc(cartRef);
    return cartSnap.data()?.cart || [];
};

export const updateCartInFirestore = async (userId: string, cart: Event[]) => {
    const cartRef = doc(collection(db, 'users'), userId);
    await setDoc(cartRef, { cart }, { merge: true });
};