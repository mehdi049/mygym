'use client'

import Button from '@/components/ui/button'
import { ROUTES } from '@/routes'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <Link href={ROUTES.AUTH}>
        <Button variant="primary" size="lg">
          Me connecter
        </Button>
      </Link>
    </main>
  )
}
