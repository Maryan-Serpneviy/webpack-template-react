import React from 'react'
import './App.scss'
import logo from '../public/logo512.png'

export default function App() {
    return (
        <div className="App">
            <h1 className="App-heading">React App</h1>
            <a className="App-link" href="https://uk.reactjs.org/docs/getting-started.html">
                Getting started
            </a>
            <img className="App-logo" id="logo" src={logo} />
        </div>
    )
}
