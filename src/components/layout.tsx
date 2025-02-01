"use client"

import * as React from "react"

interface LayoutProps {
  children: React.ReactNode
}

interface LayoutContextType {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const LayoutContext = React.createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = React.useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  return (
    <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div className="min-h-screen bg-background text-foreground">{children}</div>
    </LayoutContext.Provider>
  )
}

