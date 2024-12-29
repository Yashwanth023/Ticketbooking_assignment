# Train Seat Reservation System

A full-stack train seat reservation system built with Next.js, PostgreSQL, and Prisma. The system allows users to book up to 7 seats at a time in a train coach with 80 seats, implementing intelligent seat allocation algorithms to prioritize booking seats in the same row.

## Features

### Train Coach Layout
- 80 seats in total
- 11 rows with 7 seats each
- Last row with 3 seats
- Visual representation of seat availability
- Real-time updates of seat status

### Booking System
- Book up to 7 seats at once
- Priority booking algorithm:
  1. Attempts to book seats in the same row
  2. If not possible, books nearest available seats
- Seat status indication (available/booked)
- Booking history
- Booking cancellation functionality

### User Management
- User registration and authentication
- Secure password handling
- JWT-based session management
- User-specific booking history

### Security Features
- Input validation and sanitization
- Protected routes and API endpoints
- CSRF protection
- Secure password hashing
- Environment variable protection

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Notifications**: Sonner

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Vercel account (for database)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Yashwanth023/Ticketbooking_assignment/.git
cd train-reservation
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database URLs (from Vercel Postgres)
POSTGRES_PRISMA_URL="your-prisma-url"
POSTGRES_URL_NON_POOLING="your-non-pooling-url"

# JWT Secret for authentication
JWT_SECRET="your-secret-key"
```

### 4. Set Up the Database

1. Create a Postgres database on Vercel:
   - Go to [Vercel Dashboard](https://vercel.com)
   - Select your project
   - Go to the Storage tab
   - Click "Create Database"
   - Select Postgres
   - Follow the setup wizard

2. Push the database schema:
```bash
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user

Request body:
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

#### POST /api/auth/login
Login user

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

#### POST /api/auth/logout
Logout user

### Booking Endpoints

#### GET /api/bookings
Get all bookings

Response:
```json
{
  "bookings": [
    {
      "id": "string",
      "seats": number[],
      "userId": "string",
      "user": {
        "name": "string"
      }
    }
  ]
}
```

#### POST /api/bookings
Create a new booking

Request body:
```json
{
  "seats": number[]
}
```

#### DELETE /api/bookings
Cancel a booking

Request body:
```json
{
  "bookingId": "string"
}
```

## Project Structure

```
train-reservation/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── logout/
│   │   └── bookings/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── bookings/
│   ├── components/
│   │   ├── auth-form.tsx
│   │   ├── coach-layout.tsx
│   │   └── navbar.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   └── db.ts
│   ├── layout.tsx
│   └── page.tsx
├── prisma/
│   └── schema.prisma
└── package.json
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy

```bash
vercel
```

## Best Practices

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Security
- Validate all user inputs
- Sanitize data before storing in database
- Use environment variables for sensitive data
- Implement proper error handling
- Use secure authentication methods

### Performance
- Implement proper loading states
- Use proper error boundaries
- Optimize database queries
- Implement proper caching strategies

## Error Handling

The application implements comprehensive error handling:
- Input validation errors
- Authentication errors
- Database operation errors
- Network request errors
- Server errors

All errors are properly logged and user-friendly error messages are displayed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

