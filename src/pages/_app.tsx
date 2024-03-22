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
    const fetchUser = async () => {
      const res = await fetch('/api/login');
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, [router])

  return (
    <main className={`font-sans ${inter.variable}`}>
      <Navbar user={user} />
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
