export interface TextFieldProps {
  value: string
  type?: string
  placeholder?: string
  name?: string
  label?: string
  helper?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  id?: string
  onChange?: (e: any) => void
}
export const TextField = ({
  value,
  type,
  placeholder,
  label,
  name,
  helper,
  error,
  leftIcon,
  rightIcon,
  disabled,
  id,
  onChange,
}: TextFieldProps) => {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <input
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        className={
          'border border-gray-200 rounded-md  p-2 block w-full ' +
          (error ? 'border-red-500' : 'border-gray-100')
        }
        id={id}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helper && <p className="mt-2 text-sm text-gray-600">{helper}</p>}
    </div>
  )
}
