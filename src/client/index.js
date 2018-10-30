import React from 'react'
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc'
import ReactDOM from 'react-dom'
import App from './App'

const GlobalStyle = createGlobalStyle`${globalStyle()}`

ReactDOM.render(<App />, document.getElementById('root'))
