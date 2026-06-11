'use client'

import { createContext, useContext, useState } from 'react'

interface ConsoleContextValue {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const ConsoleContext = createContext<ConsoleContextValue>({
  collapsed: false,
  setCollapsed: () => {},
})

export function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <ConsoleContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </ConsoleContext.Provider>
  )
}

export function useConsole() {
  return useContext(ConsoleContext)
}
