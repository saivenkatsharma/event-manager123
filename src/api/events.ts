import {
    collection,
    query,
    limit,
    getDocs,
    where,
    orderBy,
    doc,
    getDoc,
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Event {
    id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    location: string;
    image: string;
    category: string;
    capacity: number;
    availableSeats: number;
}

// Format Firestore document to Event type
const formatEvent = (doc: QueryDocumentSnapshot<DocumentData>): Event => ({
    id: doc.id,
    ...doc.data() as Omit<Event, 'id'>
});

// Fetch featured events for hero section
export const fetchFeaturedEvents = async (count = 4): Promise<Event[]> => {
    try {
        const eventsRef = collection(db, 'events');
        const q = query(
            eventsRef,
            where('isFeatured', '==', true),
            orderBy('date', 'asc'),
            limit(count)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(formatEvent);
    } catch (error) {
        console.error('Error fetching featured events:', error);
        throw error;
    }
};

// Fetch single event by ID
export const fetchEventById = async (eventId: string): Promise<Event | null> => {
    try {
        const eventRef = doc(db, 'events', eventId);
        const eventDoc = await getDoc(eventRef);

        if (!eventDoc.exists()) {
            return null;
        }

        return {
            id: eventDoc.id,
            ...eventDoc.data() as Omit<Event, 'id'>
        };
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
};

// Fetch events by category
export const fetchEventsByCategory = async (
    category: string,
    limitCount = 8
): Promise<Event[]> => {
    try {
        const eventsRef = collection(db, 'events');
        const q = query(
            eventsRef,
            where('category', '==', category),
            orderBy('date', 'asc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(formatEvent);
    } catch (error) {
        console.error('Error fetching events by category:', error);
        throw error;
    }
};

// Fetch upcoming events
export const fetchUpcomingEvents = async (limitCount = 8): Promise<Event[]> => {
    try {
        const now = new Date().toISOString();
        const eventsRef = collection(db, 'events');
        const q = query(
            eventsRef,
            where('date', '>=', now),
            orderBy('date', 'asc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(formatEvent);
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        throw error;
    }
};

// Search events
export const searchEvents = async (
    searchTerm: string,
    limitCount = 8
): Promise<Event[]> => {
    try {
        // Note: For better search functionality, consider using Algolia or similar
        const eventsRef = collection(db, 'events');
        const q = query(
            eventsRef,
            where('title', '>=', searchTerm),
            where('title', '<=', searchTerm + '\uf8ff'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(formatEvent);
    } catch (error) {
        console.error('Error searching events:', error);
        throw error;
    }
};

// Check event availability
export const checkEventAvailability = async (eventId: string): Promise<number> => {
    try {
        const event = await fetchEventById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        return event.availableSeats;
    } catch (error) {
        console.error('Error checking event availability:', error);
        throw error;
    }
};