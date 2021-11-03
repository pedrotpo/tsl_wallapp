import React, { FC, ReactElement } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import store from 'commons/ducks/store'
import customTheme, { GlobalStyles } from 'commons/theme'

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={customTheme}>
          <Global styles={GlobalStyles} />
          <ColorModeScript
            initialColorMode={customTheme.config.initialColorMode}
          />
          {children}
        </ChakraProvider>
      </Router>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
