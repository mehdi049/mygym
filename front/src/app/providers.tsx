'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'

export default function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <ToastContainer hideProgressBar={true} />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CookiesProvider>
    </>
  )
}
