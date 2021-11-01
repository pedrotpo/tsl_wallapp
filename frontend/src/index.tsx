import '@fontsource/roboto-mono'
import 'focus-visible/dist/focus-visible'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import App from './app'
import store from 'commons/ducks/store'
import customTheme, { GlobalStyles } from 'commons/theme'

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={customTheme}>
      <Global styles={GlobalStyles} />
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
)
