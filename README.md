# My T3 App

This is a [Next.js](https://nextjs.org) application bootstrapped with ⁠ create-t3-app ⁠. It includes user authentication and interest selection functionalities.

## Features

### User Authentication

Users can sign up and log in to the application. During the signup process, use ⁠ 111111 ⁠ as the OTP. 

### Interest Selection

After logging in, users can select their interests. These selections are persisted in the database and can be viewed or modified at any time.

## Tech Stack

⁠- [Next.js](https://nextjs.org): A React framework for building the overall structure of the application.
- ⁠[API Routes](https://nextjs.org/docs/api-routes/introduction): Used for creating server-side API endpoints.
- ⁠[Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework for styling the application.
- ⁠[TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that adds static types.
- ⁠[Prisma](https://prisma.io): An open-source database toolkit for handling database operations.
- ⁠[Postgres](https://www.postgresql.org/): The database used to store user and interest data.
- ⁠[Next.js Middleware](https://nextjs.org/docs/middleware): Used to check if a user is logged in. If a user is not logged in, they are redirected to the login page.

# Getting Started

Follow these steps to set up the application:

1.⁠ ⁠Create a ⁠`.env` ⁠file in the root directory of the project and add the following line:

    ⁠```properties
    DATABASE_URL="postgresql://com_owner:S3GZdHRzFjr4@ep-late-mouse-a110uw2t.ap-southeast-1.aws.neon.tech/com?sslmode=require"
    ```

    This sets up the connection to the PostgreSQL database.

2.⁠ ⁠Install the project dependencies:

    ```bash
    npm install
    ```

3.⁠ ⁠Start the development server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.