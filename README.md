# Pachiku

Pachiku is a text-based social media site. It uses Next.js, Prisma ORM, Next-Auth Authentication and Vercel. This is my first big project after learning Next.js. The purpose for creating this website was to practice everything I learnt in many of the classes I took. I wanted to deliver a overall balanced application that balances Style with Function. I did everything from scratch including the code, design and icons.

**Live Demo:** [https://pachiku.vercel.app](https://pachiku.vercel.app)

## Tech Stack

-   **Frontend:** Next.js with React
-   **Backend:** Next.js API routes
-   **Database:** PostgreSQL with Prisma ORM
-   **Styling:** Custom CSS
-   **Authentication:** NextAuth.js
-   **Deployment:** Vercel

## Features

### Frontend

-   Post a Pachiku, a Pachiku is like a post or tweet but only text.
-   Like, Comment and Share
-   Update your info in a dashboard page
-   Dashboard filters your own Pachikus
-   Be able to see other's Pachikus even while logged out
-   Mobile responsive design
-   Stylistic and Interactive UI
-   Original Logo and Icons

### Backend

-   Google OAuth for secure sign in
-   No email sign up for Job recruiters or just privacy reasons
-   API routes for NEXT.js caching
-   Server Actions for form submissions
-   Prisma for Database handling
-   Protected Routes
-   Route Intercepted Modals for Pachikus
-   Server side rendering for faster load time

## Getting Started

### Prerequisites

-   Node.js (v14+)
-   Prisma
-   npm or yarn

### Installation

1. Clone and install:

    ```bash
    git clone https://github.com/BikiBalami99/Pachiku.git
    cd Pachiku
    npm install
    ```

2. Configure environment:

    - make a `.env` at root
    - Add the following environment variables:

    ```
    # For Prisma
    DATABASE_URL=your_postgresql_connection_string

    # Auth
    NEXTAUTH_SECRET=your_generated_secret  # Generate with: openssl rand -base64 32

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # To get Google OAuth credentials:
    # 1. Go to https://console.cloud.google.com/
    # 2. Create a new project
    # 3. Go to "APIs & Services" > "Credentials"
    # 4. Configure OAuth consent screen (External)
    # 5. Create OAuth client ID (Web application)
    # 6. Add http://localhost:3000/api/auth/callback/google to Authorized redirect URIs
    # 7. Save and copy your Client ID and Client Secret

    # Base URL for API requests
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

    > **Important:** Never commit your actual credentials to version control. For production deployment, use environment variables in your hosting platform.

3. Initialize the database and start:

    ```bash
    npm i
    npx prisma generate
    npx prisma migrate dev --name init
    npx prisma db push
    npm run dev
    ```

    If you have any trouble cloning this site please email me at bikibalami1999@gmail.com
    
    The app will be available at [http://localhost:3000](http://localhost:3000)
