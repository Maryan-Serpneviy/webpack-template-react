import React from 'react'
import Logo from '@img/React.svg'
import styles from './App.module.scss'

export default function App() {
    return (
        <div className={styles.app}>
            <h1 className={styles.heading}>Welcome to React</h1>
            <a className={styles.link} href="https://uk.reactjs.org/docs/getting-started.html" target="_blank">
                Getting started
            </a>
            {/* <Logo className={styles.logo} /> */}
            <div className={styles.circles}>
                <div></div>
                <div></div>
                <div></div>
                <span></span>
            </div>
        </div>
    )
}
