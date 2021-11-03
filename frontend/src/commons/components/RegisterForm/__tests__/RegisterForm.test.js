import React from 'react'
import { render, screen, cleanup } from 'commons/utils/test-utils'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import RegisterForm from '../RegisterForm'

const renderComponent = () => render(<RegisterForm />)

afterEach(cleanup)

describe('RegisterForm - Initial Rendering', () => {
  test('renders email field and label', () => {
    renderComponent()
    expect(screen.getByTestId('email-field')).toBeInTheDocument()
    expect(screen.getByTestId('email-label')).toHaveTextContent('Email')
  })
  test('renders first name field and label', () => {
    renderComponent()
    expect(screen.getByTestId('first-name-field')).toBeInTheDocument()
    expect(screen.getByTestId('first-name-label')).toHaveTextContent(
      'First Name'
    )
  })
  test('renders last name field and label', () => {
    renderComponent()
    expect(screen.getByTestId('last-name-field')).toBeInTheDocument()
    expect(screen.getByTestId('last-name-label')).toHaveTextContent('Last Name')
  })
  test('renders password field and label', () => {
    renderComponent()
    expect(screen.getByTestId('password-field')).toBeInTheDocument()
    expect(screen.getByTestId('password-label')).toHaveTextContent('Password')
  })
  test('renders submit button', () => {
    renderComponent()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submit')
  })
})

describe('RegisterForm - Field Errors', () => {
  test('test required fields', () => {
    renderComponent()
    userEvent.click(screen.getByTestId('email-field'))
    userEvent.tab()
    userEvent.click(screen.getByTestId('first-name-field'))
    userEvent.tab()
    userEvent.click(screen.getByTestId('last-name-field'))
    userEvent.tab()
    userEvent.click(screen.getByTestId('password-field'))
    userEvent.tab()

    expect(screen.getByTestId('email-error')).toBeInTheDocument()
    expect(screen.getByTestId('email-error')).toHaveTextContent('Required')
    expect(screen.getByTestId('first-name-error')).toBeInTheDocument()
    expect(screen.getByTestId('first-name-error')).toHaveTextContent('Required')
    expect(screen.getByTestId('last-name-error')).toBeInTheDocument()
    expect(screen.getByTestId('last-name-error')).toHaveTextContent('Required')
    expect(screen.getByTestId('password-error')).toBeInTheDocument()
    expect(screen.getByTestId('password-error')).toHaveTextContent('Required')
  })
  test('test email validator with valid email', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    userEvent.type(getByTestId('email-field'), 'dave@tsl.io')
    expect(queryByTestId('email-error')).toBeNull()
  })

  test('test email validator with invalid email', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    userEvent.type(getByTestId('email-field'), 'dave.tsl.io')
    userEvent.tab()
    expect(queryByTestId('email-error')).toHaveTextContent(
      'Insert a valid email'
    )
  })
  test('test first name validator with valid name length', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    userEvent.type(getByTestId('first-name-field'), 'Dave')
    expect(queryByTestId('first-name-error')).toBeNull()
    userEvent.type(getByTestId('last-name-field'), 'Hartmann')
    expect(queryByTestId('last-name-error')).toBeNull()
  })

  test('test first name validator with invalid name length', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    userEvent.type(
      getByTestId('first-name-field'),
      'ThisIsAReallyLongStringWithMoreThan25Chars'
    )
    userEvent.tab()
    userEvent.type(
      getByTestId('last-name-field'),
      'ThisIsAReallyLongStringWithMoreThan25Chars'
    )
    userEvent.tab()
    expect(queryByTestId('first-name-error')).toHaveTextContent(
      'Field must have less than 25 characters'
    )
    expect(queryByTestId('last-name-error')).toHaveTextContent(
      'Field must have less than 25 characters'
    )
  })
  test('test password validator with valid password', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    userEvent.type(getByTestId('password-field'), 'TSLogic@1234')
    expect(queryByTestId('password-error')).toBeNull()
  })
  test('test password validator with invalid password', () => {
    const { getByTestId, queryByTestId } = renderComponent()
    userEvent.type(getByTestId('password-field'), 'pass1234')
    userEvent.tab()
    expect(queryByTestId('password-error')).toHaveTextContent(
      'Password must contain at least: 1 lowercase character, 1 uppercase character, 1 number, 1 special character and have at least 8 characters'
    )
  })
})
