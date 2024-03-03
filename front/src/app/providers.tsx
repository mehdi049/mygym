'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

type providersProps = {
  children: React.ReactNode
}
export default function Providers({ children }: providersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000,
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
