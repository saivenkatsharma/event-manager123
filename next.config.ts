/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
          's1.ticketm.net',
          's2.ticketm.net',
          's3.ticketm.net',
          'media.ticketmaster.com',
          'maps.ticketmaster.com'
      ],
  },
  // ... any other config options
}

module.exports = nextConfig