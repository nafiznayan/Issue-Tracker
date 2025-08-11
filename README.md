# Issue Tracker

A full-stack Issue Tracker application built with Next.js, featuring Google OAuth authentication, issue assignment, pagination, and a clean UI powered by Radix UI. The app is backed by Prisma ORM with a Neon database and deployed on Vercel.

## Features

- **Google OAuth Authentication** for secure sign-in and session management  
- **Dashboard with Pagination** to browse issues efficiently  
- **Issue Assignment** to users for better team collaboration  
- **Radix UI Components** for accessible and responsive interface  
- **Prisma ORM** for type-safe database access  
- **Neon Database** for fast and scalable storage  
- **Deployed on Vercel** with smooth CI/CD  

## Tech Stack

- Next.js (React framework)  
- Prisma (ORM)  
- Neon (PostgreSQL serverless database)  
- Radix UI (Component library)  
- NextAuth.js (Authentication)  
- Axios (HTTP client)  
- React Hook Form & Zod (Form handling and validation)  

## Getting Started

### Prerequisites

- Node.js (v16 or later)  
- PostgreSQL database (Neon recommended)  
- Google OAuth credentials  

1. Set up environment variables

   ```bash
   DATABASE_URL=your_database_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret


   
