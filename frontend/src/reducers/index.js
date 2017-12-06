import { combineReducers } from 'redux'
import posts from './posts'
import comments from './comments'
import categories from './categories'
import category from './category'
import post from './post'

export default combineReducers({
  categories,
  category,
  posts,
  comments,
  post
})
