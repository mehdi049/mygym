export type TextAreaProps = {
  value: string
  placeholder?: string
  name?: string
  label?: string
  helper?: string
  error?: string
  disabled?: boolean
  id?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export const TextAreaField = ({
  value,
  placeholder,
  label,
  name,
  helper,
  error,
  disabled,
  id,
  onChange,
}: TextAreaProps) => {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        className={
          'border p-2 block w-full h-80 resize-none ' +
          (error ? 'border-red-500' : 'border-gray-200')
        }
        id={id}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helper && <p className="mt-2 text-sm text-gray-600">{helper}</p>}
    </div>
  )
}
