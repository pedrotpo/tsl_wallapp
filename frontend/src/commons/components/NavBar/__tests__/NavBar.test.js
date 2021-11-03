import React from 'react'
import { render, screen } from 'commons/utils/test-utils'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import NavBar from '../NavBar'

describe('NavBar - No User', () => {
  beforeEach(() => render(<NavBar />))
  test('renders log in button', () => {
    expect(screen.getAllByTestId('button-login')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('button-login')[0]).toHaveTextContent('Log In')
    expect(screen.getAllByTestId('button-login')[1]).toBeInTheDocument()
    expect(screen.getAllByTestId('button-login')[1]).toHaveTextContent('Log In')
  })
  test('renders sign up button', () => {
    expect(screen.getAllByTestId('button-signup')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('button-signup')[0]).toHaveTextContent(
      'Sign Up'
    )
    expect(screen.getAllByTestId('button-signup')[1]).toBeInTheDocument()
    expect(screen.getAllByTestId('button-signup')[1]).toHaveTextContent(
      'Sign Up'
    )
  })
  test('renders logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
  test('renders title', () => {
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toHaveTextContent('THE WALL')
  })
})

describe('NavBar - Logged User', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    user: { data: { first_name: 'Dave' } }
  })
  beforeEach(() =>
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    )
  )
  test('renders log out button', () => {
    expect(screen.getAllByTestId('button-logout')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('button-logout')[0]).toHaveTextContent(
      'Logout'
    )
    expect(screen.getAllByTestId('button-logout')[1]).toBeInTheDocument()
    expect(screen.getAllByTestId('button-logout')[1]).toHaveTextContent(
      'Logout'
    )
  })
  test('renders user greeting', () => {
    expect(screen.getByTestId('greeting')).toBeInTheDocument()
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hello Dave!')
  })
})
