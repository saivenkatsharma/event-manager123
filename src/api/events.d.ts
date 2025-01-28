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

export function fetchFeaturedEvents(count?: number): Promise<Event[]>;
export function fetchEventById(eventId: string): Promise<Event | null>;
export function fetchEventsByCategory(category: string, limitCount?: number): Promise<Event[]>;
export function fetchUpcomingEvents(limitCount?: number): Promise<Event[]>;
export function searchEvents(searchTerm: string, limitCount?: number): Promise<Event[]>;
export function checkEventAvailability(eventId: string): Promise<number>; 