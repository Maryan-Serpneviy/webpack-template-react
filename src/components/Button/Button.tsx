import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Button.module.scss'

type Props = {
   className?: string
   type?: string
   style?: object
   disabled?: boolean
   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
   children: JSX.Element[] | JSX.Element
}

const Button: React.FC<Props> = (
   { className, disabled, onClick, children, ...props }
   : InferProps<typeof Button.propTypes>) => {

   let styles = [classes.button]
   if (disabled) {
      styles.push(classes.disabled)
   }
   if (props.type && !disabled) {
      styles.push(props.type)
   }
   if (className && !disabled) {
      styles = [...styles, ...className.split(' ')]
   }

   return (
      <button
         className={styles.join(' ')}
         style={props.style || null}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   )
}

Button.propTypes = {
   className: PropTypes.string,
   type: PropTypes.string,
   style: PropTypes.object,
   disabled: PropTypes.bool,
   onClick: PropTypes.func
}

export default Button
