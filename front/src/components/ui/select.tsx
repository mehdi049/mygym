export type SelectOption = {
  label: string
  value: string | number
  disabled?: boolean
}
type SelectProps = {
  value: string | number
  options: SelectOption[]
  label?: string
  name?: string
  helper?: string
  error?: string
  disabled?: boolean
  id?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
export const Select = ({
  value,
  options,
  label,
  name,
  helper,
  error,
  disabled,
  id,
  onChange,
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm">{label}</label>}
      <select
        name={name}
        className={
          'border p-2 block w-full ' +
          (error ? 'border-red-500' : 'border-gray-100')
        }
        id={id}
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        {options.map((option, key) => {
          return (
            <option
              key={key}
              value={option.value}
              selected={value === option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          )
        })}
      </select>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helper && <p className="mt-2 text-sm text-gray-600">{helper}</p>}
    </div>
  )
}
