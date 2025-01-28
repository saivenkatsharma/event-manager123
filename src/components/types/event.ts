export interface Event {
    id: string;
    name: string;
    url: string;
    images: Array<{
        url: string;
        width?: number;
        height?: number;
    }>;
    dates: {
        start: {
            localDate: string;
            localTime?: string;
        };
    };
    _embedded: {
        venues: Array<{
            name: string;
            city: {
                name: string;
            };
            country: {
                name: string;
            };
        }>;
    };
    priceRanges?: Array<{
        min: number;
        max: number;
        currency: string;
    }>;
    classifications: Array<{
        genre?: {
            name: string;
        };
        subGenre?: {
            name: string;
        };
    }>;
}