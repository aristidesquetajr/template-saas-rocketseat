import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Template SaaS Rocketseat',
  description: 'Welcome to the landing page of our project!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-AO">
      <body className={`${poppins.className} } bg-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}
