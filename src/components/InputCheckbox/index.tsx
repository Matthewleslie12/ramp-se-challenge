import classNames from "classnames"
import { useRef, useState, useEffect } from "react"
import { InputCheckboxComponent } from "./types"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled }) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`)
  const [isChecked, setIsChecked] = useState(() => localStorage.getItem(inputId) === "true" || checked)

  const toggleCheckbox = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    localStorage.setItem(inputId, String(newValue))
  }

  useEffect(() => {
    const storedValue = localStorage.getItem(inputId)
    if (storedValue !== null && storedValue !== String(isChecked)) {
      setIsChecked(storedValue === "true")
    }
  }, [inputId, isChecked])

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": isChecked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
        onClick={toggleCheckbox}
      />

      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={isChecked}
        disabled={disabled}
        onChange={toggleCheckbox}
      />
    </div>
  )
}
