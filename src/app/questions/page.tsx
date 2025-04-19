import AdminOnlyRoute from '@/components/AdminOnlyRoute'
import React from 'react'

export default function page() {
  return (
    <AdminOnlyRoute>
        <div>
            page
        </div>
    </AdminOnlyRoute>
    
  )
}
