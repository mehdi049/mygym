'use client'

import { ROUTES } from '@/routes'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Link href={ROUTES.AUTH}>Se connecter</Link>
    </main>
  )
}
