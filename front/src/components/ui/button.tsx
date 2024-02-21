import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  id?: string
  size?: 'lg' | 'sm'
  className?: string
  onClick?: React.FormEventHandler<Element>
  disabled?: boolean
  isLoading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children?: React.ReactNode
}

const Button = ({
  variant,
  id,
  size = 'sm',
  className,
  onClick,
  disabled,
  isLoading,
  iconLeft,
  iconRight,
  children,
}: ButtonProps) => {
  let styleClass =
    'transition-all duration-500 font-bodyMedium overflow-hidden '

  switch (size) {
    case 'lg':
      styleClass += 'h-10 px-2 sm:px-9 rounded-lg '
      break
    case 'sm':
      styleClass += 'h-8 px-2 sm:px-4 rounded-lg '
      break
    default:
      break
  }

  if (disabled) {
    switch (variant) {
      case 'primary':
        styleClass += 'text-white bg-red-500 opacity-50 cursor-default '
        break
      case 'secondary':
        styleClass += styleClass +=
          'text-gray-900 border border-gray-100 bg-gray-50 cursor-default '
        break
      default:
        break
    }
  } else
    switch (variant) {
      case 'primary':
        styleClass +=
          'text-white bg-red-500 hover:bg-red-violet cursor-pointer '
        break
      case 'secondary':
        styleClass +=
          'text-gray-600 hover:text-gray-900 bg-white border border-gray-100 hover:bg-gray-100 cursor-pointer '
        break
      default:
        break
    }

  styleClass += className ? ' ' + className : ''
  if (iconLeft || iconRight)
    styleClass += ' flex gap-2 justify-center items-center'

  return (
    <button
      type="button"
      className={styleClass}
      id={id}
      onClick={onClick && !disabled ? onClick : undefined}
      disabled={disabled}
    >
      {isLoading ? (
        <p className="flex justify-center text-xs">chargement...</p>
      ) : (
        <>
          {iconLeft && <span>{iconLeft}</span>}
          {children}
          {iconRight && <span>{iconRight}</span>}
        </>
      )}
    </button>
  )
}

export default Button
