'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/store/store' 

export default function AdminOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') {
      router.replace('/login') 
    }
  }, [isLoggedIn, router, user?.role])

  if (!isLoggedIn || user?.role !== 'admin') return null 

  return <>{children}</>
}
