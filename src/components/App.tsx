import React from 'react'
import Logo from '@img/React.svg'
import styles from './App.module.scss'

export default function App() {
    const { app, heading, link, logo } = styles
    
    return (
        <div className={app}>
            <h1 className={heading}>Welcome to React</h1>
            <a className={link} href="https://uk.reactjs.org/docs/getting-started.html" target="_blank">
                Getting started
            </a>
            <Logo className={logo} />
        </div>
    )
}
