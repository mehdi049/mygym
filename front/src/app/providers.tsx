'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
