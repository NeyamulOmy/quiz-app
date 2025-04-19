'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/store/store' 

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login') 
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null 

  return <>{children}</>
}
