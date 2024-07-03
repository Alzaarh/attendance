export function Label({ id, children, error = false }) {
  return (
    <label htmlFor={id} className={`label ${error && 'label-error'}`}>
      {children}
    </label>
  )
}
