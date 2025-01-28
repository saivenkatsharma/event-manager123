import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  try {
    const response = await axios.get(
      'https://app.ticketmaster.com/discovery/v2/events.json',
      {
        params: {
          classificationName: category,
          apikey: process.env.TICKETMASTER_API_KEY,
          size: 100,
          countryCode: 'US'
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`API responded with status ${response.status}`);
    }

    if (!response.data?._embedded?.events) {
      return res.status(200).json([]);
    }

    res.status(200).json(response.data._embedded.events);
  } catch (error) {
    console.error('Ticketmaster API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch events',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}