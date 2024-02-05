import Image from 'next/image'
import RootLayout from './layout'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <form>
        <label className="block">username</label>
        <input
          className="block border border-1 rounded-lg p-2"
          type="text"
          placeholder="username"
        />
        <label className="block mt-4">password</label>
        <input
          className="block border border-1 rounded-lg p-2"
          type="password"
          placeholder="password"
        />
        <button type="button" className="mt-4 border border-1 rounded-lg p-2">
          submit
        </button>
      </form>
    </main>
  )
}
