'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'

interface MainLayoutProps {
  children: ReactNode
  onSearchClick?: () => void
  onMenuClick?: () => void
}

export function MainLayout({ children, onSearchClick, onMenuClick }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearchClick={onSearchClick} onMenuClick={onMenuClick} />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
