import { combineReducers } from 'redux'
import posts from './posts.js'
import comments from './comments.js'
import categories from './categories.js'
import category from './category.js'

export default combineReducers({
  categories,
  category,
  posts,
  comments
})
