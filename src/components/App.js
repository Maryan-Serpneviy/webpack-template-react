import React from 'react'
import styles from './App.module.scss'
import Logo from '~i/React.svg'
// import logo from '~i/React.png'

export default function App() {
    return (
        <div className={styles.app}>
            <h1 className={styles.heading}>React App</h1>
            <a className={styles.link} href="https://uk.reactjs.org/docs/getting-started.html">
                Getting started
            </a>
            <Logo className={styles.logo} />
            {/* <img className={styles.logo} src={logo} /> */}
        </div>
    )
}
