import { useState, useEffect } from 'react';
import { fetchEvents } from '../../lib/events';
import { Event } from '../types/event';

export const useEvents = (category: string) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchEvents(category);
                setEvents(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [category]);

    return { events, loading, error };
};