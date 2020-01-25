import React from 'react'
import styles from './App.module.scss'
import Logo from '~i/React.svg'

export default function() {
    const { app, heading, link, logo } = styles
    return (
        <div class={app}>
            <h1 class={heading}>React App</h1>
            <a class={link} href="https://uk.reactjs.org/docs/getting-started.html" target="_blank">
                Getting started
            </a>
            <Logo class={logo} />
        </div>
    )
}
