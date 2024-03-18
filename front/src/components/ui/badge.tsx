import React from 'react'

interface BadgeProps {
  variant?: 'error' | 'warning' | 'info'
  textSize?: string
  id?: string
  className?: string
  children?: React.ReactNode
}

const Badge = ({
  variant,
  textSize = 'text-xs',
  id,
  className = '',
  children,
}: BadgeProps) => {
  let styleClass = 'p-0.5 inline-block rounded text-white '

  switch (variant) {
    case 'info':
      styleClass += 'bg-sky-800'
      break
    case 'warning':
      styleClass += 'bg-amber-300'
      break
    case 'error':
      styleClass += 'bg-red-700'
      break
  }

  return (
    <span className={styleClass + ' ' + className + ' ' + textSize} id={id}>
      {children}
    </span>
  )
}

export default Badge
