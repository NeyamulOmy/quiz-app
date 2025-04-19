// src/app/layout.tsx

import './globals.css'
import 'antd/dist/reset.css' 

import { ConfigProvider } from 'antd'

import type { Metadata } from 'next'
import React from 'react'
import LayoutDesign from '@/components/LayoutDesign'

export const metadata: Metadata = {
  title: 'Next.js 15 App with Ant Design',
  description: 'Example with Layout + ConfigProvider + Zustand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
            },
          }}
        >
          <LayoutDesign>
            {children}
          </LayoutDesign>

        </ConfigProvider>
      </body>
    </html>
  )
}
