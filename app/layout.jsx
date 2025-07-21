'use client'

import './globals.css'
import { useState, useEffect } from 'react'

export const metadata = {
  title: 'HR Dashboard',
  description: 'Mini HR Performance Dashboard',
}

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // On initial load, set the 'dark' class based on current theme state only
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    } else {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <body>
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded"
          aria-label={theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {children}
      </body>
    </html>
  )
}
