'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '../Context/UserProvider'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })
// export const metadata = {
//   title: "Darren's Auto Detail - Quality Auto-Service in Queens",
//   description: 'Precision Care for Your Vehicle',
// }
export default function RootLayout({ children }) {
  return (
    <UserProvider>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&display=swap"/>
      </head>
      <body className={inter.className}>
      <NavBar />
      <div style={{paddingTop: "70px"}}/>
        {children}
        </body>
    </html>
    </UserProvider>
  )
}