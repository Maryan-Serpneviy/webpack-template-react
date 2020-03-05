import React, { useRef, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Input.module.scss'

const Input: React.FC<Props> = ({
   className,
   label,
   type,
   placeholder,
   value,
   error,
   isTouched,
   isValid,
   shouldValidate,
   autoblur,
   autofocus,
   onChange,
   onKeyDown,
   onKeyUp,
   onKeyPress
}: InferProps<typeof Input.propTypes>) => {

   const inputRef = useRef(null)
   
   const inputType = type || 'text'
   const htmlFor = `${inputType}-${Math.round(Math.random() * 1000)}`
   const style = [
      classes.input
   ]

   const isInvalid = (): boolean => !isValid && isTouched && shouldValidate

   if (isInvalid()) {
      style.push(classes.invalid)
   }

   useEffect(() => {
      if (autoblur) {
         inputRef.current.blur()
      }
      if (autofocus) {
         inputRef.current.focus()
      }
   }, [autoblur, autofocus])

   return (
      <div className={style.join(' ')}>
         <label htmlFor={htmlFor}>{label}</label>
         <input
            type={inputType}
            id={htmlFor}
            ref={autofocus || autoblur ? inputRef : null}
            placeholder={placeholder ? placeholder : ''}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown ? onKeyDown : null}
            onKeyUp={onKeyUp ? onKeyUp : null}
            onKeyPress={onKeyPress ? onKeyPress : null}
         />
         {isInvalid() && <span>{error || 'Value is incorrect'}</span>}
      </div>
   )
}

Input.propTypes = {
   className: PropTypes.string,
   label: PropTypes.string,
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   error: PropTypes.string,
   isTouched: PropTypes.bool,
   isValid: PropTypes.bool,
   shouldValidate: PropTypes.bool,
   autoblur: PropTypes.bool,
   autofocus: PropTypes.bool,
   onChange: PropTypes.func,
   onKeyDown: PropTypes.func,
   onKeyUp: PropTypes.func,
   onKeyPress: PropTypes.func
}

type Props = {
   className?: string
   label?: string
   type?: string
   placeholder?: string
   value?: string
   error?: string
   isTouched?: boolean
   isValid?: boolean
   shouldValidate?: boolean
   autoblur?: boolean
   autofocus?: boolean
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
   onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export default Input
