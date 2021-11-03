import React from 'react'
import { render, screen } from 'commons/utils/test-utils'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'

beforeEach(() => render(<LoginForm />))

describe('LoginForm - Initial Rendering', () => {
  test('renders email field and label', () => {
    expect(screen.getByTestId('email-field')).toBeInTheDocument()
    expect(screen.getByTestId('email-label')).toHaveTextContent('Email')
  })
  test('renders password field and label', () => {
    expect(screen.getByTestId('password-field')).toBeInTheDocument()
    expect(screen.getByTestId('password-label')).toHaveTextContent('Password')
  })
  test('renders submit button', () => {
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submit')
  })
})

describe('LoginForm - Field Errors and Submitting', () => {
  test('test required fields', () => {
    userEvent.click(screen.getByTestId('email-field'))
    userEvent.tab()
    userEvent.click(screen.getByTestId('password-field'))
    userEvent.tab()

    expect(screen.getByTestId('email-error')).toBeInTheDocument()
    expect(screen.getByTestId('email-error')).toHaveTextContent('Required')
    expect(screen.getByTestId('password-error')).toBeInTheDocument()
    expect(screen.getByTestId('password-error')).toHaveTextContent('Required')
  })
})
