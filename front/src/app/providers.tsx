'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import getQueryClient from './getQueryClient'

type providersProps = {
  children: React.ReactNode
}
export default function Providers({ children }: providersProps) {
  const queryClient = getQueryClient()
  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
      </QueryClientProvider>
    </>
  )
}
