import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Layout.module.scss'

type Props = {
   children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = ({
   children
}: InferProps<typeof Layout.propTypes>) => {

   return (
      <div className={classes.Layout}>
         <main>
            {children}
         </main>
      </div>
   )
}

export default Layout
