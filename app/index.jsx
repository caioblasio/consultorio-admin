import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Providers from 'containers/Providers'
import App from 'containers/App'
import 'configs/firebase'

ReactDOM.render(
  <BrowserRouter>
    <Providers>
      <App />
    </Providers>
  </BrowserRouter>,
  document.getElementById('app')
)
