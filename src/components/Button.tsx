import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`btn btn--${variant}`} {...rest}>
      {children}
    </button>
  )
}