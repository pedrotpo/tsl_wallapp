import { connect } from 'react-redux'
import { loadPosts } from 'commons/ducks/posts'
import type { AppDispatch } from 'commons/ducks/store'
import Post from './Post'

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadPosts: () => dispatch(loadPosts())
})

export default connect(null, mapDispatchToProps)(Post)
