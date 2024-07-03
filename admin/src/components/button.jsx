export const Button = ({ children, variant = '', ...props }) => {
  return (
    <button {...props} className={`button ${variant}`}>
      {children}
    </button>
  )
}
