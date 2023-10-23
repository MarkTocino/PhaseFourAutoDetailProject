"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "../Context/UserProvider";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&display=swap"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossOrigin="anonymous"
          />
        </head>
        <body className={inter.className}>
          <NavBar />
          <div style={{ paddingTop: "70px" }} />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
