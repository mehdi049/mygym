import { API_ENDPOINT } from '@/lib/const/endpoints'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        identifier: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            API_ENDPOINT.STRAPI + '/auth/local',
            {
              identifier: credentials?.identifier,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (res.status === 200) return res.data.user

          return null
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log('session', session)
      console.log('token', token)
      console.log('user', user)

      return session
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log('account', account)
      console.log('token', token)
      console.log('profile', profile)
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.email
      }
      return token
    },
  },
})

export { handler as GET, handler as POST }
