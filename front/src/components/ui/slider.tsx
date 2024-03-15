import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

interface SliderProps {
  visible: boolean
  onHide: () => void
  children?: React.ReactNode
}

export const Slider = ({ children, visible, onHide }: SliderProps) => {
  return (
    <div
      className={
        'fixed right-0 top-0 h-screen w-full max-w-md border-l shadow-md bg-white z-50 ' +
        (visible ? 'block' : 'hidden')
      }
    >
      <div className="flex items-center justify-end p-4 border-b border-b-gray-200">
        <FontAwesomeIcon
          icon={faClose}
          className="text-black cursor-pointer"
          onClick={() => onHide()}
        />
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
