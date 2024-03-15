export type TextFieldProps = {
  value: string
  type?: string
  placeholder?: string
  name?: string
  label?: string
  helper?: string
  error?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  disabled?: boolean
  id?: string
  min?: number
  max?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const TextField = ({
  value,
  type,
  placeholder,
  label,
  name,
  helper,
  error,
  //leftIcon,
  //rightIcon,
  disabled,
  id,
  min,
  max,
  onChange,
}: TextFieldProps) => {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={
          'border rounded-md p-2 block w-full ' +
          (error ? 'border-red-500' : 'border-gray-200')
        }
        id={id}
        disabled={disabled}
        onChange={onChange}
        min={min}
        max={max}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helper && <p className="mt-2 text-sm text-gray-600">{helper}</p>}
    </div>
  )
}
