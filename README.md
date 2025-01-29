# EventHub - Event Booking Platform

## Overview
EventHub is a modern event booking platform built with Next.js, TypeScript, and Material-UI. It allows users to discover, book, and manage event tickets with a seamless user experience.

## Features
- 🎫 Browse and search events
- 👤 User authentication
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🎫 Ticket booking management
- 💳 Secure payment processing
- 📊 User dashboard

## Tech Stack
- **Frontend**
  - Next.js
  - TypeScript
  - Material-UI (MUI)
  - Context API for state management
  - Firebase Authentication

- **Backend**
  - Firebase
  - Cloud Firestore
  - Firebase Storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

## Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── Cart/         # Cart-related components
│   ├── Event/        # Event-related components
│   └── layout/       # Layout components (Navbar, Footer)
├── Context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Next.js pages
└── config/          # Configuration files
```

## Key Components

### Authentication
- User registration
- Login/Logout
- Password reset
- Profile management

### Event Management
- Event listing
- Event details
- Event search and filtering
- Event booking

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Price calculation
- Checkout process

## Available Scripts

```bash
# Development
npm run dev         # Start development server

# Production
npm run build      # Build for production
npm start          # Start production server

# Testing
npm run test       # Run tests
npm run lint       # Run linting
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Deployment
The application can be deployed to various platforms:
- Vercel (recommended for Next.js)
- Netlify
- Firebase Hosting

## Environment Variables
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID |

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI](https://mui.com/)
- [Firebase](https://firebase.google.com/)

## Support
For support, email support@eventhub.com or create an issue in the repository.

## Authors
- Madiraju saivenkat sharma

## Status
Project is: _in progress_
