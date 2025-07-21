import React from 'react'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  default: 'bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-300',
}

export default function Button({ children, onClick, variant = 'default', className = '', ...props }) {
  const baseClasses = 'px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200'
  const variantClasses = variants[variant] || variants.default
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}
