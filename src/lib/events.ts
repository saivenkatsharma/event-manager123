import axios from 'axios';
import { Event } from '../components/types/event';

export const fetchEvents = async (category: string): Promise<Event[]> => {
    try {
        const response = await axios.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            {
                params: {
                    apikey: process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY,
                    keyword: category,
                    size: 20,
                    sort: 'date,asc',
                    countryCode: 'US',
                    includeTBA: 'yes',
                    includeTest: 'no'
                }
            }
        );
        return response.data._embedded?.events || [];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};