import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from '@s'
import App from '@com/App'

const app = (
   <Router>
      <Provider store={"store"}>
         <App />
      </Provider>
   </Router>
)

ReactDOM.render(app, document.querySelector('#root'))
