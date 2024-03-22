import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import Navbar from "~/components/Navbar";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {

  const router = useRouter();
  const [user, setUser] = useState({ isLoggedIn: false, email: '', name: '' });

  useEffect(() => {
    fetch('/api/login').then(res => res.json()).then((data) => setUser(data))
      .catch(err => console.log('Error getting user data', err));
  }, [router])

  return (
    <main className={`font-sans ${inter.variable}`}>
      <Navbar user={user} />
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
