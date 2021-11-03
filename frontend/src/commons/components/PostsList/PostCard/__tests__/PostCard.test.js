import React from 'react'
import { render, screen } from 'commons/utils/test-utils'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import PostCard from '../PostCard'

describe('NavBar - Logged User', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    user: { data: { id: 1 } }
  })
  const props = {
    id: 1,
    content: 'Hello',
    author: 'Rob',
    published: '2021-11-03T01:35:56.183310Z',
    author_id: 1
  }

  test('renders card with delete button', () => {
    render(
      <Provider store={store}>
        <PostCard post={props} />
      </Provider>
    )
    expect(screen.getByTestId('postcard-content')).toHaveTextContent('Hello')
    expect(screen.getByTestId('postcard-author')).toHaveTextContent('Rob')
    expect(screen.getByTestId('postcard-published')).toHaveTextContent(
      '02/11/2021 22:35:56'
    )
    expect(screen.getByTestId('postcard-del-btn')).toBeInTheDocument()
  })
  test('renders card without delete button', () => {
    const props = {
      id: 1,
      content: 'Hello',
      author: 'Rob',
      published: '2021-11-03T01:35:56.183310Z',
      author_id: 2
    }
    render(
      <Provider store={store}>
        <PostCard post={props} />
      </Provider>
    )
    expect(screen.queryByTestId('postcard-del-btn')).toBeNull()
  })
})
