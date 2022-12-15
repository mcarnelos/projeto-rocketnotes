import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components' //importando ThemeProvider
import theme from './styles/theme'
import GlobalStyle from './styles/global'

import { Routes } from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>
)
