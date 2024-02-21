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
    <div>
      {label && <label className="mb-2 block">{label}</label>}
      <input
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        className="border border-gray-100 p-2 block"
        id={id}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helper && <p className="mt-2 text-sm text-gray-600">{helper}</p>}
    </div>
  )
}
