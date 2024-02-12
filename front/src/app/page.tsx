import LogoutButton from '@/components/Logout'
import { ROUTES } from '@/lib/const/routes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession()
  return (
    <main className="min-h-screen p-24">
      {session ? (
        <>
          {JSON.stringify(session)}
          <br />
          {session.user?.email}
          <br />
          <LogoutButton />
        </>
      ) : (
        <Link href={ROUTES.AUTH}>Se connecter</Link>
      )}
    </main>
  )
}
