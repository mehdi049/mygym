import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export type CheckboxProps = {
  placeholder?: string
  name?: string
  label?: string
  helper?: string
  error?: string
  disabled?: boolean
  id?: string
  checked: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const CheckboxField = ({
  placeholder,
  label,
  name,
  helper,
  error,
  disabled,
  id,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className="w-full mb-2">
      <div className="flex gap-2 items-center">
        <div
          className={
            'border border-gray-200  rounded relative w-5 h-5 flex items-center justify-center ' +
            (checked ? 'bg-red-500' : '')
          }
        >
          <input
            type="checkbox"
            name={name}
            placeholder={placeholder}
            className="absolute left-0 top-0 w-full h-full opacity-0"
            id={id}
            disabled={disabled}
            onChange={onChange}
            checked={checked}
          />
          {checked && <FontAwesomeIcon icon={faCheck} className="text-white" />}
        </div>
        {label && <label className="block text-sm">{label}</label>}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {helper && <p className="mt-2 text-sm text-gray-600">{helper}</p>}
    </div>
  )
}
