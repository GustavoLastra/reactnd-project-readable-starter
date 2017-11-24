import { combineReducers } from 'redux'
//import posts from './posts'
//import categories from './categories'
import {
  GET_CATEGORIES,
  GET_POSTS
}from '../actions'

function posts (state = [], action) {
  if (action.type === GET_POSTS) {
    console.log("On post reducer action "+ action.posts );
    return action.posts
  }
  return state
}

function categories (state = [], action) {
  if (action.type === GET_CATEGORIES) {
    console.log("On post reducer categories "+ action.categories );
    return action.categories
  }
  return state
}


export default combineReducers({
  categories,
  posts,
})
