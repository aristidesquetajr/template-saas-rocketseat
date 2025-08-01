import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Template SaaS Rocketseat',
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Lading Page</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  )
}
