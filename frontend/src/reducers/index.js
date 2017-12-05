import { combineReducers } from 'redux'
import posts from './posts.js'
import comments from './comments.js'
import categories from './categories.js'

export default combineReducers({
  categories,
  posts,
  comments
})
