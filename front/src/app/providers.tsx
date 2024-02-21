'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ToastContainer } from 'react-toastify'

type providersProps = {
  children: React.ReactNode
}
export default function Providers({ children }: providersProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
