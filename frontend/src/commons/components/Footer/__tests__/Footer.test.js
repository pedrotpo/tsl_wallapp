import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

test('loads footer content', () => {
  render(<Footer />)

  expect(screen.getByTestId('first_p')).toHaveTextContent(
    'Made with care and Chakra UI, React, Vite and Redux!'
  )
  expect(screen.getByTestId('second_p')).toHaveTextContent('By Pedro T. Pires')
})
