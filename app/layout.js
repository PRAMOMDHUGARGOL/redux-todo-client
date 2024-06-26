import { Inter } from "next/font/google";
import { Providers } from "./Provider";
import Navbar from "./components/Navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo-Redux",
  description: "Basic Excercise",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
