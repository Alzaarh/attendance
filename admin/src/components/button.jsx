import { cn } from '../lib/utils'

export const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'bg-primary text-white rounded-lg py-1 px-4  hover:bg-primary/90 ',
        props.className
      )}
    >
      {children}
    </button>
  )
}

// variant: {
//   default: 'bg-primary text-white hover:bg-primary/90',
//   secondary: 'bg-secondary text-white hover:bg-secondary/90',
//   destructive: 'bg-danger text-white hover:bg-danger/90',
//   ghost: 'hover:bg-black/5',
//   success: 'bg-success text-white hover:bg-success/90',
//   successAlt: 'bg-white text-success hover:bg-white/90',
//   outline: 'border border-gray-300 hover:bg-black/5',
// },
// size: {
//   default: 'h-10 px-4 py-2',
//   sm: 'h-9 px-3',
//   lg: 'h-11 px-8',
//   xlg: 'h-12 px-10',
//   icon: 'h-10 w-10',
