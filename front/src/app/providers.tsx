'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ToastContainer } from 'react-toastify'

type providersProps = {
  children: React.ReactNode
}
export default function Providers({ children }: providersProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  )
  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
